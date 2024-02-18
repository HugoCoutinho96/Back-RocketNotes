const knex = require("../database/knex")
const appError = require("../utils/appError")

class NotesController{
    async create(req,res){
        
            const {title, description, tags, links} = req.body
            const {user_id} = req.params
    
            const [note_id] = await knex("notes").insert({
                title,
                description,
                user_id
            })
    
            const linksInsert = links.map(link => ({
                note_id,
                url: link
            }))
    
            await knex("links").insert(linksInsert)
    
            const tagsInsert = tags.map(name => ({
                note_id,
                name,
                user_id
            }))
    
            await knex("tags").insert(tagsInsert)
            
            res.json()
    }

    async show(req, res){
        const {id} = req.params
        const note = await knex("notes").where({id}).first()

        if(!note)
            throw new appError("Nota não encontrada!")

        const tags = await knex("tags").where({note_id: note.id}).orderBy("name")
        const links = await knex("links").where({note_id: note.id}).orderBy("created_at")

        res.json({
            ...note,
            tags,
            links
        })
    }

    async delete(req, res){
        const {id} = req.params
        await knex("notes").where({id}).delete()
        res.json()
    }

    async index(req, res){
        const {title, user_id, tags} = req.query
        let notes
try{
    if(tags){
        const filterTags = tags.split(",").map(tags => tags.trim())
        notes = await knex("tags")
        .select([
            "notes.id",
            "notes.title",
            "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")
    }else{
        notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`)
    }
}catch(error){
    console.log(error)
}

        const userTags = await knex("tags").where({user_id})
        const noteWithTags = notes.map(note => {
            const noteTag = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: noteTag
            }
        })
        res.json(noteWithTags)
    }
}

module.exports = NotesController