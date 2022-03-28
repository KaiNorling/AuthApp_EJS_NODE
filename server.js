const express = require("express")
const server = express()
const efu = require('express-fileupload')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const path = require("path")
const routes = require("./routes/routes")
const mongo = require("./modules/mongo")


const PORT = process.env.PORT || 2000
server.listen(PORT, () => {
    console.log(`SERVER is RUNNING IN ${PORT}`)
})



//SETTINGS

server.set("view engine", "ejs")
server.use(express.json())
server.use(express.urlencoded({
    extended: true,
}))
server.use(cookieParser())

//STATIC FOLDER
server.use(express.static(path.join(__dirname, "public")))
// server.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"  )))




async function main() {
    const db = await mongo()
   // console.log(db);
    await server.use((req, res, next) => {
        req.db = db
        next()
    })
    await routes(server)
}

main()