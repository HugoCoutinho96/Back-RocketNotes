const {Router} = require("express")
const noteRoutes = Router()

let notesController = require("../controllers/NotesController")
notesController = new notesController()

noteRoutes.post("/:user_id", notesController.create)
noteRoutes.get("/:id", notesController.show)
noteRoutes.get("/", notesController.index)
noteRoutes.delete("/:id", notesController.delete)

module.exports = noteRoutes