
//send kuvaa sitä, että lähetetäänkö dataa vai vastaanotetaanko sitä
//Jos send on true, niin oletusarvoisesti tietokantaan lähetetään uusi henkilö
//Jos send on false, niin oletusarvoisesti tietokannasta haetaan kaikki henkilöt
let send = true
//const [send, setSend] = useState(true)
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("Liian vähän argumentteja")
  console.log("Anna joko vain salasana tai salasana ja lisättävän henkilön nimi ja puhelinnumero erotettuna välilyönnillä")
  process.exit(1)
} else if (process.argv.length  === 3) {
  send = false
} else if (process.argv.length === 5) {
  send = true
} else {
  console.log("Liian paljon argumentteja")
  console.log("Anna joko vain salasana tai salasana ja lisättävän henkilön nimi ja puhelinnumero erotettuna välilyönnillä")
  process.exit(1)
}

const password = process.argv[2]
const URL = `mongodb+srv://yli_paino:${password}@puhelinluettelo-3bhmk.mongodb.net/test?retryWrites=true`
mongoose.connect(URL, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)
if (send) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(response => {
    console.log(`lisätään ${person.name} numero ${person.number} luetteloon`)
    mongoose.connection.close()
  })
} else {
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}

