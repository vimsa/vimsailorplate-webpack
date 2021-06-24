const express = require("express")
const app = express()
const path = require("path")
const port = 3000


app.set("views", path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.get("/", (req, res) => {
   res.render("pages/home", {
      meta: {
         title: "VIMSΛ",
         description: "Surya Aditya - Creative developer"
      }
   })
})

app.get("/about", (req, res) => {
   res.render("pages/about", {
      meta: {
         title: "VIMSΛ",
         description: "Surya Aditya - Creative developer"
      }
   })
})

app.get("/work", (req, res) => {
   res.render("pages/work", {
      meta: {
         title: "VIMSΛ",
         description: "Surya Aditya - Creative developer"
      }
   })
})


app.listen(port, () => {
   console.log(`VIMSΛ App listening at http://localhost:${port}`)
})
