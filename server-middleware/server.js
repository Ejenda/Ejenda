const app = require('express')()
var crypto = require('crypto')
const fs = require('fs')
const bcrypt = require('bcrypt')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.URL ?? require('../env.json').URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
const assignmentSchema = new mongoose.Schema({
  subject: String,
  assignments: Array,
  id: String,
})
const Assignment = mongoose.model('assignments', assignmentSchema)
app.use(bodyParser.json())
app.post('/get', (req, res) => {
  if (req.body.assignments && req.body.subject) {
    id = crypto.randomBytes(4).toString('hex')
    const assignment = new Assignment({
      subject: req.body.subject,
      assignments: req.body.assignments,
      id,
    })
    assignment.save()
    res.send(id)
  } else {
    res.sendStatus(400).send('Missing data')
  }
})
app.get('/add/:str', async (req, res) => {
  data = await Assignment.findOne({ id: req.params.str })
  console.log(data)
  res.redirect(`/app#${JSON.stringify(data)}`)
})

module.exports = app
