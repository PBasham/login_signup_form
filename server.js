// Require Dependencies --------------------------------------------------
const express = require("express")
const path = require("path")
// connect to dotenv file --------------------------------------------------
require("dotenv").config()
// Middleware --------------------------------------------------
const app = express()

app.use(express.json())



const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
})