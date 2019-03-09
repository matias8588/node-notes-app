const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/notesApp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}) // Configuración de mongoose para la base de datos
  .then(db => console.log('Base de datos conectada')
  )
  .catch(err => console.error(err))