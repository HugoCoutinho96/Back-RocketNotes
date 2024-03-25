const {Router} = require("express")
const noteRoutes = Router()
ensureAuthenticated = require("../middlewares/ensureAuthenticated")

let notesController = require("../controllers/NotesController")
notesController = new notesController()

noteRoutes.use(ensureAuthenticated)
noteRoutes.post("/", notesController.create)
noteRoutes.get("/:id", notesController.show)
noteRoutes.get("/", notesController.index)
noteRoutes.delete("/:id", notesController.delete)

module.exports = noteRoutes