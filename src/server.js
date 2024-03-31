require("express-async-errors")
require("dotenv/config")
const express = require("express")
const app = express()
const port = process.env.PORT || 3333

const uploadsConfig = require("./configs/upload")

const migrations = require("./database/sqllite/migrations")
migrations()

const AppError = require("./utils/appError")
const routes = require("./routes")
const cors = require("cors")

app.use(cors())
app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER))
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

