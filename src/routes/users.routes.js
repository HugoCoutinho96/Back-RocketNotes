const {Router} = require("express")
const userRouter = Router()
const UserController = require("../controllers/UserController")
const userController = new UserController()

const UserAvatarController = require("../controllers/UserAvatarController")
const userAvatarController = new UserAvatarController()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const multer = require("multer")
const uploadsConfig = require("../configs/upload")
const upload = multer(uploadsConfig.MULTER)

userRouter.post("/", userController.create)
userRouter.put("/",  ensureAuthenticated, userController.update)
userRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = userRouter