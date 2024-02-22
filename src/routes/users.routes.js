const {Router} = require("express")
const userRouter = Router()
let UserController = require("../controllers/UserController")
UserController = new UserController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const multer = require("multer")
const uploadsConfig = require("../configs/upload")
const upload = multer(uploadsConfig.MULTER)

userRouter.post("/", UserController.create)
userRouter.put("/",  ensureAuthenticated, UserController.update)
userRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (req, res) => {
    console.log(req.file.filename)
    res.json()
})

module.exports = userRouter