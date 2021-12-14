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
      slug : req.body.name.toLowerCase().replace(/[^\w]/gi,'-'),
      ...req.body
    }
    heroes = [ ...heroes, heroe ]
    res.json(heroe)
})

const format = (req, res, next) => {
  const allowedKeys = Object.keys(heroes[0])
  const bodyKeys = Object.keys(req.body)
  const invalidKey = bodyKeys.find(key => !allowedKeys.includes(key))

  if (invalidKey) {
    res.status(400).send("Requete invalide")
  } else {
    next()
  }

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
  heroe.power = heroe.power.filter(p => p !== power)
  res.json(`Le pouvoir ${power} de ${slug} a été effacé correctement`)
})

app.put("/:slug", format, deleteHero, (req, res) => {
  const { slug } = req.params
  const index = heroes.findIndex(hero => hero.slug === slug)
  let hero = heroes[index]

  hero = {
    ...hero,

    
    ...req.body,
    slug: req.body.name.toLowerCase().replace(/[^\w]/gi, '-')

  }
})



module.exports = app