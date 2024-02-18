const {Router} = require("express")
const routes = Router()

const userRouter = require("./users.routes.js")
const noteRouter = require("./notes.routes.js")
const tagsRouter = require("./tags.routes.js")
const sessionsRouter = require("./sessions.routes.js")

routes.use("/users", userRouter)
routes.use("/notes", noteRouter)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes