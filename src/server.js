require("express-async-errors")
const express = require("express")
const app = express()
const port = 3333

const migrations = require("../database/sqllite/migrations")
migrations()

const AppError = require("../utils/appError")

const routes = require("../routes")
app.use(express.json())
app.use(routes)
app.use((error, req, res, next) => {
    if(error instanceof AppError)
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })    
})

app.listen(port, () => console.log(`Está rodando na porta ${port}`))

