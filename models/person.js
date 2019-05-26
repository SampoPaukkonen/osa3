const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('yhdistetään', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('yhdistetty MongoDB:hen')
    })
    .catch(error => {
        console.log('virhe yhdistettäessä MongoDB:hen: ', error.message)
    })

const personSchema = new mongoose.Schema({
        name: {type: String, minlength: 3, required: true, unique: true},
        number: {type: String, minglength: 8, required: true, unique: true}
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        //returnedObject.id =
        //delete returnedObject._id
       // delete returnedObject._v 
    }
})
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)