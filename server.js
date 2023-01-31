// Require Dependencies --------------------------------------------------
const express = require("express")
const path = require("path")
// connect to dotenv file --------------------------------------------------
require("dotenv").config()
// Middleware --------------------------------------------------
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, "dist")))



app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

const port = 3001

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
})