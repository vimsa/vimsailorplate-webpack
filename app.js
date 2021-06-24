const express = require('express')
const app = express()
const port = 3000

const path = require('path')

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
   res.render('index', {
      meta: {
         title: "VIMSΛ",
         description: "Surya Aditya - Creative developer"
      }
   })
})

app.listen(port, () => {
   console.log(`Vimsa http://localhost:${port}`)
})
