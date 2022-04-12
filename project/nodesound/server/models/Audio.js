const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AudioSchema = new Schema({
    name: String,
    rating: Number,
    format: String,
    customName: String,
})

module.exports = Audiodb = mongoose.model('audiofiles', AudioSchema)
