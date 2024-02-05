const {Router} = require("express")
const routes = Router()

const userRouter = require("./users.routes.js")
const noteRouter = require("./notes.routes.js")
const tagsRouter = require("./tags.routes.js")

routes.use("/users", userRouter)
routes.use("/notes", noteRouter)
routes.use("/tags", tagsRouter)

module.exports = routes