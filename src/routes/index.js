const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Index')
})

router.get('/About', (req, res) => {
    res.send('About')
})

module.exports = router
