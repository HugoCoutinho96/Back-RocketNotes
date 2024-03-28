const sqliteConnection = require("../database/sqllite")
const appError = require("../utils/appError")
const {hash, compare} = require("bcryptjs")

class UserController{
    async create(req,res){
        const {name, email, password} = req.body
        const dataBase = await sqliteConnection()
        const userExists = await dataBase.get("select * from users where email = (?)",[email])
        
        if(!name)
            throw new appError("Está faltando o nome!")
    
        if(userExists)
            throw new appError("Usuário já existe!")
        
        const hashPassword = await hash(password, 8)
        await dataBase.run("insert into users (name, email, password) values (?,?,?)",
                            [name,email,hashPassword])
            
        res.status(201).json()
    }
    async update(req, res){
        const user_id = req.user.id
        const {name, email, password, oldPassword} = req.body
        const dataBase = await sqliteConnection()

        const user = await dataBase.get("select * from users where id = (?)", [user_id])
        if(!user)
            throw new appError("Usuário não existe!")

        const emailExists = await dataBase.get("select * from users where email = (?)",[email])
        if(emailExists && emailExists.id !== user.id)
            throw new appError("Email já cadastrado!")

        if(password && oldPassword){
            const checkOldPassword = await compare(oldPassword, user.password)
            if(!checkOldPassword)
                throw new appError("Senha antiga errada!")
            
            user.password = await hash(password, 8)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        await dataBase.run("update users set name = (?), email = (?), password = (?) ,updated_at = datetime('now') where id = (?)", [user.name, user.email, user.password, user_id])
        res.json({})    
    }
}

module.exports = UserController