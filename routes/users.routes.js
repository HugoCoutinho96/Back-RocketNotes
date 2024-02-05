const {Router} = require("express")
const userRouter = Router()
let UserController = require("../controllers/UserController")
UserController = new UserController()

function myMiddleware(req, res, next){
    console.log("middleware funcionando")
    next()
}

userRouter.get("/:id/:user", UserController.show)

userRouter.post("/",myMiddleware, UserController.create)

userRouter.put("/:id", UserController.update)

module.exports = userRouter