const express = require("express")
const res = require("express/lib/response")
const app = express()

app.use(express.json())

let heroes = require("../heroes.json")

app.get("/", (req, res) => {
    res.json(heroes)
  })

app.get("/:slug", (req, res) => {
    const { slug } = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)
    
    res.json(heroe)
})

app.get("/:slug/powers", (req, res) => {
    const { slug } = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)
    const powers = heroe.power.map(heroe => 
         heroe
    )
    console.log(powers);
    res.json(powers)
})

app.post("/", (req, res) => {
    const heroe = {
      ...req.body
    }
  
    heroes = [ ...heroes, heroe ]
    
    res.json(heroe)
  })

app.put("/heroes/:slug/powers", (req, res) => {
    const { slug } = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)

    const newPower = req.body.power

    const newArray = [...heroe.power, newPower]

    res.json(newArray)

})

module.exports = app