const mongoose = require('mongoose')
const { Schema } = mongoose

// Modelo de almacenamiento de datos en la base

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Notes', NoteSchema)
