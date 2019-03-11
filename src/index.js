const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// Inicializaciones
const app = express()
require('./database')
require('./config/passport')
var port = process.env.port || 3000

// Configuraciones
app.set('port', port) // Conexión con el puerto 3000 local
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
app.use(passport.initialize()) // Autenticacion de sesion del usuario y registro en base de datos
app.use(passport.session())
app.use(flash()) // Enviar mensaje entre vistas
// Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// Rutas
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Archivos estaticos
app.use(express.static(path.join(__dirname, '/public'))) // Direccion a la carpeta con archivos estaticos

// Inicio del servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en el puerto', app.get('port'))
})
