const express = require('express')
const app = express()
const port = 3000

const path = require('path')

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
   res.render('index')
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})
