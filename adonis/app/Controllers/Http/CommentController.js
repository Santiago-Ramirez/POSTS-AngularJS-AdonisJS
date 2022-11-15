'use strict'
const Comment = use('App/Models/Comment')
class CommentController {
    async store({request, response, auth}){
        const data = request.only(['body', 'post_id'])
        const user = await auth.getUser()
        const comment = new Comment()
        comment.body = data['body']
        comment.post_id = data['post_id']
        comment.user = user['username']
        comment.save()

        return response.created({
            status: true,
            data: comment
        })
    }
    async getComments({request, response, auth, params}){
        const data = params.id
        const comments = await Comment.query().where('post_id', data).fetch()

        return response.ok({
            status: true,
            data: comments
        })
    }
    async delete({ params , response}){
        const id = params.id
        const comm = await Comment.find(id)
        if(await comm.delete()){
            return response.status(200).json({
                status: true,
                message: "Comentario eliminado correctamente"
            })
        }
        return response.status(400).json({
            status: false,
             message: "No se pudo eliminar el comentario"
        })
    }
    
    async update({params, request,response}){
        const data = request.only(['id', 'body'])
        const comment = new Comment()
        comment.id = data['id']
        comment.body = data['body']
        if( await Comment.query()
       .where('id', comment.id)
       .update({'body': comment.body, 'updated_at': Date()}))
       {
        return response.status(200).json({
            status: true,
            message: "Comentario actualizado correctamente"
        })
       }
       return response.status(400).json({
        status: false,
         message: "Comentario no actualizado"
    })

    }

}

module.exports = CommentController
