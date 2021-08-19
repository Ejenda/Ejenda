const app = require("express")();
import { randomBytes } from "crypto";
import fs from "fs";
import bcrypt from "bcrypt";
import cors from "cors";
import { json } from "body-parser";
import { connect, connection, Schema, model, models } from "mongoose";
const whitelist = ["https://3000-plum-lizard-545djgei.ws-us13.gitpod.io"];

let saltRounds = 10;
const db = connection;
const assignmentSchema = new Schema({
  subject: String,
  assignments: Array,
  id: String,
});
const Assignment = models.assignments || model("assignments", assignmentSchema);
const sessionSchema = new Schema({
  id: String,
  token: String,
});
const Session = models.sessions || model("sessions", sessionSchema);
const schoolSchema = new Schema({
  url: String,
  name: String,
});
const School = models.schools || model("schools", schoolSchema);
const userAssignmentSchema = new Schema({
  name: String,
  date: String,
  id: String,
  subject: String,
});
const userSchema = new Schema({
  name: {
    type: String,
    unique: true, // `email` must be unique
  },
  password: String,
  onboarded: Boolean,
  school: String,
  assignments: [userAssignmentSchema],
  subjects: {
    type: Array,
    default: [
      ["Math", "red"],
      ["English", "indigo"],
      ["Science", "yellow"],
      ["Social Studies", "blue"],
      ["Foreign Language", "green"],
      ["Related Arts", "purple"],
      ["Random Things", ""],
    ],
  },
});
const User = models.users || model("users", userSchema);
let sessions = [];
(async () => {
  sessions = await Session.find({});
})();

const strictCors = {
  origin: "*" /*function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },*/,
};
function findSession(token) {
  const session = sessions.find((f) => f.token == token);
  return session;
}
async function addSession(token, id, time) {
  // defaults to 6 hours
  new Session({ id: id, token: token }).save();
  sessions.push({ id: id, token: token });

  if (time) {
    setTimeout(() => {
      // remove token after time seconds
      removeSession(token);
    }, time);
  }
}

async function removeSession(token) {
  Session.deleteOne({ token });
  sessions = sessions.filter((obj) => {
    return obj.token !== token;
  });
}

function findUser(id) {
  id = id.toString();
  if (id.length !== 24) {
    id = "000000000000000000000001";
  }

  return new Promise(async (resolve, reject) => {
    try {
      var user = await User.findOne({ _id: id });
      resolve(user);
    } catch (error) {
      reject(Error(error));
    }
  });
}

app.use(async (req, res, next) => {
  // get user
  const token = req.headers.authorization;
  let user = findSession(token);
  if (user) {
    res.locals.requester = await findUser(user.id);
    if (res.locals.requester) {
      res.locals.loggedIn = true;
    } else {
      res.locals.loggedIn = false; // the account was deleted but token remains
      removeSession(token);
    }
  } else {
    res.locals.loggedIn = false;
  }
  next();
});

app.set("trust proxy", 1);

// default rate limit is 100 requests per second
app.use(cors(strictCors));
connect(process.env.URL ?? require("../env.json").URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
function checkLoggedIn(cb) {
  const callback =
    cb ||
    function (req, res) {
      res
        .status(401)
        .json({ error: "can't complete this action while logged out" });
    };
  return function (req, res, next) {
    if (!res.locals.loggedIn) callback(req, res, next);
    else next();
  };
}

function checkLoggedOut(cb) {
  const callback =
    cb ||
    function (req, res) {
      res
        .status(400)
        .json({ error: "can't complete this action while logged in" });
    };
  return function (req, res, next) {
    if (res.locals.loggedIn) callback(req, res, next);
    else next();
  };
}
app.use(json());

app.post(
  "/users",
  cors(strictCors),
  json(),
  checkLoggedOut(),
  async function (req, res) {
    // create account
    if (req.is("application/json")) {
      if (typeof req.body.username !== "string")
        return res.json({ error: "invalid username" });
      if (typeof req.body.password !== "string")
        return res.json({ error: "invalid password" });

      var username = req.body.username.toLowerCase();
      var password = req.body.password;
      const hashed = await bcrypt.hash(password, saltRounds);
      try {
        new User({
          name: username,
          password: hashed,
        }).save(function (error) {
          if (error) {
            if (error.code == 11000) {
              res.status(409).json({ error: "username already taken" });
            } else {
              console.log(error);
              res.status(500).json({ error: "internal server error" });
            }
          } else {
            res.json({ ok: "created user" });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }
    } else {
      res.status(415).json({ error: "must send json data" });
    }
  }
);
app.options("/session", cors(strictCors));
app.post(
  "/session",
  cors(strictCors),
  checkLoggedOut(),
  async function (req, res) {
    // create a new session
    if (req.is("application/json")) {
      if (typeof req.body.username !== "string")
        return res.json({ error: "invalid username" });
      if (typeof req.body.password !== "string")
        return res.json({ error: "invalid password" });

      var username = req.body.username.toLowerCase();
      var password = req.body.password;
      const user = await User.findOne({ name: username });
      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          randomBytes(48, function (err, buffer) {
            // todo: promiseify
            const token = buffer.toString("hex");
            addSession(token, user._id);
            res.json({ token });
          });
        } else {
          //password was incorrect
          res.status(401).json({ error: "incorrect username or password" });
        }
      } else {
        res.status(403).json({ error: "incorrect username or password" });
      }
    } else {
      res.status(415).json({ error: "must send json data" });
    }
  }
);
function cleanFormatUser(user) {
  // format a user from db into a clean format. strip away password etc
  return {
    name: user.name,
    id: user._id,
    onboarded: user.onboarded,
    subjects: user.subjects,
  };
}

app.get("/session", cors(strictCors), async function (req, res) {
  // send a user session
  let user = res.locals.requester;
  if (user) {
    res.json({
      user: cleanFormatUser(user),
    });
  } else {
    res.json({});
  }
});

app.delete(
  "/session",
  cors(strictCors),
  checkLoggedIn(),
  async function (req, res) {
    // log out
    removeSession(req.headers.authorization);
    res.json({ ok: "removed session" });
  }
);

app.post("/get", (req, res) => {
  if (req.body.assignments && req.body.subject) {
    let id = randomBytes(4).toString("hex");
    const assignment = new Assignment({
      subject: req.body.subject,
      assignments: req.body.assignments,
      id,
    });
    assignment.save();
    res.send(id);
  } else {
    res.sendStatus(400).send("Missing data");
  }
});
app.get("/add/:str", async (req, res) => {
  let data = await Assignment.findOne({ id: req.params.str });
  res.redirect(`/app#${JSON.stringify(data)}`);
});
app.post("/schools/lookup", async (req, res) => {
  let school = await School.findOne({ url: req.body.url });
  if (school) {
    res.json({ id: school._id, name: school.name });
  } else {
    res.json({});
  }
});
app.post("/schools/new", checkLoggedIn(), async (req, res) => {
  new School({ url: req.body.url, name: req.body.name }).save();
  res.json({});
});
app.post("/onboard", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;

  let dbUser = await User.findOne({ _id: user._id });
  dbUser.school = req.body.school;
  dbUser.onboarded = true;
  await dbUser.save();
  res.json({ ok: true });
});
app.post("/assignments/new", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  let body = req.body;
  let temp = dbUser;
  temp.assignments.push({
    name: body.name,
    date: body.date,
    id: body.id,
    subject: body.subject,
  });
  dbUser = temp;
  await dbUser.save();
  res.json({});
});
app.post("/subjects/update", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  let body = req.body;
  dbUser.subjects = body.subjects;
  // validate subject array
  let valid = true;
  for (subject of dbUser.subjects) {
    if (typeof subject[0] !== "string" && typeof subject[1] !== "string") {
      valid = false;
      break;
    }
  }
  if (valid) {
    await dbUser.save();
    res.json({});
  } else {
    res.json({ error: "invalid subject list" });
  }
});
app.get("/assignments/:subject", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  res.json(
    dbUser.assignments.filter((item) => {
      return item.subject == req.params.subject;
    })
  );
});
app.delete("/assignments/delete", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  let assignments = await dbUser.assignments;
  let filtered = assignments.filter((item) => {
    return item.id !== req.body.id;
  });
  dbUser.assignments = filtered;
  await dbUser.save();
  res.json({ ok: true });
});
export default app;
