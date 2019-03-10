const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (name.length <= 0) {
    errors.push({ text: 'Por favor inserte un nombre' })
  }
  if (email.length <= 0) {
    errors.push({ text: 'Por favor inserte un email' })
  }
  if (password !== confirmPassword) {
    errors.push({ text: 'Las contraseñas no coinciden' })
  }
  if (password.length < 4) {
    errors.push({ text: 'La contraseña debe ser mayor a 4 caracteres' })
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email, password, confirmPassword })
  } else {
    const emailUser = await User.findOne({ email: email })
    if (emailUser) {
      req.flash('error_msg', 'El email está en uso')
      res.redirect('/users/signup')
    }
    const newUser = new User({ name, email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    req.flash('success_msg', 'Se ha registrado correctamente')
    res.redirect('/users/signin')
  }
})

module.exports = router
