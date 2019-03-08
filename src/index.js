const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

// Inicializaciones
const app = express()
require('./database')

// Configuraciones
app.set('port', process.env.port || 3000) // Conexión con el puerto 3000 local
app.set('views', path.join(__dirname, 'views')) // Configuración para que node encuentre la carpeta views dentro de src
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
})) // Motor de plantillas handelbars
app.set('view engine', '.hbs') // Utilización de plantillas handelbars

// Middlewares
app.use(express.urlencoded({ extended: false })) // Traducción de datos recibidas del formulario
app.use(methodOverride('_method')) // Sirve para que los formularios puedan enviar mas metodos que no sean get y post
app.use(session({
  secret: 'myaplicacionsecreta',
  resave: true,
  saveUninitialized: true
})) // Autenticación del usuario y almacenamiento temporal en la base de datos

// Variables globales

// Rutas
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))) // Direccion a la carpeta con archivos estaticos

// Inicio del servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en el puerto', app.get('port'))
})
