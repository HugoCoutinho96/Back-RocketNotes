const knex = require("../database/knex")
const appError = require("../utils/appError")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController{
    
    
    async create(req, res){
            const {email, password} = req.body

            const user = await knex("users").where({email}).first()
            if(!user){
                throw new appError("Email ou senha não existe", 401)
            }

            const passwordMatched = await compare(password, user.password)

            if(!passwordMatched){
                throw new appError("Email ou senha não existe", 401)
            }

            const { secret, expiresIn } = authConfig.jwt
            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })

            return res.json({user, token})
    }
}

module.exports = SessionsController