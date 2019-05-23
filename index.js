const cors    = require('cors')
const express = require('express')
const morgan  = require('morgan')
const bodyParser = require('body-parser')
const app = express()
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
app.use(bodyParser.json())
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "045-123654"
    },
    {
        id: 2,
        name: "Arto Järvinen",
        number: "041-21423123"
    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "040-4323234"
    },
    {
        id: 4,
        name: "Martti Tienari",
        number: "09-784232"
    },
    {
        id: 5,
        name: "Sampo Paukkonen",
        number: "Jotain pyhiä lukuja"
    }
]


const generateID = () => {
    return Math.floor(Math.random() * Math.floor(persons.length * 1000))
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const mainInfo = `<div>Puhelinluettelossa ${persons.length} henkilön tiedot</div>`
    const time     = `<div>${new Date()}</div>`
    response.send(mainInfo + time)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const target = persons.find(person => person.id === id)
    if (target) {
        response.json(target)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons  = persons.filter(target => target.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    //Sovitaan, että id on erisuuri, kuin nolla, joten
    const temp = generateID()
    const id = temp > 0
    ? temp
    : 1
    const target = request.body
    if (!target.name) {
        return response.status(404).json({
            error: 'name is missing'
        })
    } else if (!target.number) {
        return response.status(404).json({
            error: 'number is missing'
        })

    } 
    const alreadeyIn = persons.find(person => person.name.includes(target.name))
    if (alreadeyIn) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }
    target.id = id
    persons = persons.concat(target)
    response.json(target)
})

/*
const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World!')
})
*/

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server runnign on port ${PORT}`)