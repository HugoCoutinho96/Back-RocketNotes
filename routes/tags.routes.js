const {Router} = require("express")
const TagsRoutes = Router()

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

TagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = TagsRoutes