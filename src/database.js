const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://matias:matias131205@cluster0-bhpbz.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}) // Configuración de mongoose para la base de datos
  .then(db => console.log('Base de datos conectada')
  )
  .catch(err => console.error(err))
