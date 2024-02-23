const database = require("../database/knex")
const AppError = require("../utils/appError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{
    async update(req, res){
        try{
            
            const user_id = req.user.id
            const avatarFileName = req.file.filename
    
            const diskStorage = new DiskStorage()
    
            const user = await database("users").where({id: user_id}).first()
    
            if(!user){
                throw new AppError("Somente usuários podem mudar a foto de perfil", 401)
            }
    
            if(user.avatar){
                await diskStorage.deleteFile(user.avatar)
            }
    
            const filename = await diskStorage.saveFile(avatarFileName)
            user.avatar = filename
    
            await database("users").update(user).where({id: user_id})
    
            return res.json(user)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = UserAvatarController