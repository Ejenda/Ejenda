const app = require("express")();
import { randomBytes } from "crypto";
import fs from "fs";
import bcrypt from "bcrypt";
import cors from "cors";
import { json } from "body-parser";
import { connect, connection, Schema, model, models } from "mongoose";
import { google, oauth2_v2 } from "googleapis"; 
import web from "./credentials.js";
import cookieParser from 'cookie-parser';
app.use(cookieParser());
const { client_secret, client_id, redirect_uris } = web;
const SCOPES = [
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.students.readonly"
];

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
  url: {
    type: String,
    unique: true,
  },
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
    unique: true,
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
  classroomToken: Object
});
const User = models.users || model("users", userSchema);
let sessions = [];
(async () => {
  sessions = await Session.find({});
})();

const strictCors = {};
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
  await Session.deleteOne({ token });
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
  const token = req.headers.authorization || req.cookies.token;
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
console.log('ENV', process.env.URL)
console.log(require("../env.json").URL)

connect(process.env.URL ?? require("../env.json").URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
        return res.json({ error: "Invalid username" });
      if (typeof req.body.password !== "string")
        return res.json({ error: "Invalid password" });

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
              res.status(409).json({ error: "Username already taken" });
            } else {
              console.log(error);
              res.status(500).json({ error: "Internal server error" });
            }
          } else {
            res.json({ ok: "created user" });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(415).json({ error: "Must send json data" });
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
        return res.json({ error: "Invalid username" });
      if (typeof req.body.password !== "string")
        return res.json({ error: "Invalid password" });

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
          //password was Incorrect
          res.status(401).json({ error: "Incorrect username or password" });
        }
      } else {
        res.status(403).json({ error: "Incorrect username or password" });
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
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  if (dbUser) {
    let data = await Assignment.findOne({ id: req.params.str });
    dbUser.assignments.push(...data);
    await dbUser.save();
    res.redirect(`/app`);
  } else {
    res.redirect('/login')
  }
  
});
app.get("/faq", (req, res) => {
  res.redirect("https://docs.ejenda.org/faq")
})
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
  for (let subject of dbUser.subjects) {
    if (typeof subject[0] !== "string" && typeof subject[1] !== "string") {
      return res.json({ error: "Invalid subject list" });
    }
  }
  await dbUser.save();
  res.json({});

});
app.get("/subjects", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  res.send(dbUser.subjects)
})
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
app.get("/google/auth", (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  res.redirect(authUrl);
});
app.get("/google/auth/callback", checkLoggedIn(), async (req, res) => {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  
  let {tokens} = await oAuth2Client.getToken(req.query.code);
  
  oAuth2Client.setCredentials(tokens);
  dbUser.classroomToken = tokens
  dbUser.save()
  res.redirect('/app')
});
app.get('/google/assignments', async (req, res)=> {
  let user = res.locals.requester;
  let dbUser = await User.findOne({ _id: user._id });
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  
  if (!dbUser.classroomToken) {
    res.send({'ok': 'logged out'})
    return
  }
  let assignments = [];
  const tokens = dbUser.classroomToken
  oAuth2Client.setCredentials(tokens);
  const classroom = google.classroom({ version: "v1", auth: oAuth2Client });

  let {data} = await classroom.courses.list({
    pageSize: 100,
    auth: oAuth2Client,
  });
  const courses = data.courses;
  if (courses && courses.length) {
    for (let course of courses) {

      if (course.courseState == "ACTIVE") {
      let { data } = await classroom.courses.courseWork.list({
        pageSize: 100,
        courseId: course.id,
        auth: oAuth2Client
      });
      if (data.courseWork) {
        assignments.push(...data.courseWork)
      }
      
    }
  }
  } else {
    console.log("No courses found.");
  }
  res.send(assignments);
})

export default app;
