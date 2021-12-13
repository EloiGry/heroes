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

const isHeroExist = (req, res, next) => {
  const heroeName = req.body.name
  const exist = heroes.some((element) => element.name === heroeName)
  if(!exist) {
    next()
  } else {
    res.status(409).send("Error")
  }
}

app.post("/", isHeroExist, (req, res) => {
    const heroe = {
      ...req.body
    }
    heroes = [ ...heroes, heroe ]
    res.json(heroe)
})

const format = (req, res, next) => {
  const a = Object.keys(heroes[0])
  const b = Object.keys(req.body)
  if (JSON.stringify(a) === JSON.stringify(b)) {
    next()
  } else {
    res.status(409).send("Error")
  }
  console.log(JSON.stringify(a))
  console.log(JSON.stringify(b));

}

app.put("/:slug/powers",format, (req, res) => {
    const { slug } = req.params
    const heroe = heroes.find(heroe => heroe.slug === slug)

    const newPower = req.body.power

    heroe.power = [...heroe.power, newPower]

    res.json(heroe.power)

})

const deleteHero = (req, res, next) => {
  const { slug } = req.params
    const heroe = heroes.findIndex(heroe => heroe.slug === slug)
    if (heroe !== -1) {
      next()
    } else {
      res.status(409).send("Error")
    }
}

app.delete("/:slug", deleteHero, (req, res) => {
    const { slug } = req.params
    const heroe = heroes.findIndex(heroe => heroe.slug === slug)
    heroes.splice(heroe, 1)
    res.json(`${slug} effacé correctement`)
})

app.delete("/:slug/power/:power", deleteHero, (req, res) => {
  const { slug, power} = req.params
  const heroe = heroes.find(heroe => heroe.slug === slug)
  const deletePower = heroe.power.findIndex(heroe => heroe.slug === slug)
  heroe.power.splice(deletePower, 1)
  res.json(`Le pouvoir ${power} de ${slug} a été effacé correctement`)
})

app.put("/:slug", format, (req, res) => {
  const { slug } = req.params
  const heroe = heroes.findIndex(heroe => heroe.slug === slug)
  const hero = {...req.body}
  heroes.splice(heroe, 1, hero)
  res.json(heroes)

})



module.exports = app