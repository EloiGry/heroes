const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const port = 5000
const heroes = require("./routes/heroes")

app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))


app.use ("/heroes", heroes)

app.listen(port, () => {
    console.log(`Server is running on port ${5000}`);
})