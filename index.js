
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors    = require('cors')
const morgan  = require('morgan')
const Person  = require('./models/person')
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
morgan.token('content', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['content'](req, res)
  ].join(' ')
})
)
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(targets => {
    response.json(targets.map(target => {
      return (target.toJSON())}))
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(targets => {
    const time     = `<div>${new Date()}</div>`
    const mainInfo = `<div>Puhelinluettelossa ${targets.length} henkilön tiedot</div>`
    response.send(mainInfo + time)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
    response.json(person.toJSON())
  })
    .catch(error => next(error))
})
//Serverin reagointi henkilötietojen päivitykseen, eli PUT-pyyntöön
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => {
      next(error)})
})
//Serverin reagointi geneeriseen gettiin
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

//Serverin reagointi henkilötiedon poistoon
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
//Serverin reagointi uuden henkilötiedon luontiin
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const target = new Person({
    name: body.name,
    number: body.number
  })
  target.save().then(savedTarget => {
    response.json(savedTarget.toJSON())
  })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "tuntematon päätepiste" })
}
//olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: "epämuodostunut id" })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})