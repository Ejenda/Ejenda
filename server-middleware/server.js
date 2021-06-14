const app = require('express')()
var crypto = require('crypto')
const bodyParser = require('body-parser')

const db = require('monk')(process.env.URL)

const assignments = db.get('assignments')
console.log(assignments)
app.use(bodyParser.json())
app.post('/get', (req, res) => {
  if (req.body.assignments && req.body.subject) {
    id = crypto.randomBytes(4).toString('hex')
    assignments.insert({
      subject: req.body.subject,
      assignments: req.body.assignments,
      id,
    })
    res.send(id)
  } else {
    res.sendStatus(400).send('Missing data')
  }
})
app.get('/add/:str', async (req, res) => {
  data = await assignments.findOne({ id: req.params.str })
  console.log(data)
  res.redirect(`/#${JSON.stringify(data)}`)
})

module.exports = app
