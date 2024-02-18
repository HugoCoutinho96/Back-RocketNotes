const knex = require("../database/knex")
const AppError = require("../utils/appError")
const { compare } = require("bcryptjs")

class SessionsController{
    async create(req, res){
        const {email, password} = req.body

        const user = await knex("users").where({email}).first()
        if(!user){
            throw new AppError("Email ou senha não existe", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Email ou senha não existe", 401)
        }

        return res.json({user})
    }
}

module.exports = SessionsController