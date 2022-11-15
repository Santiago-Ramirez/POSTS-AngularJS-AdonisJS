'use strict'
const Post = use('App/Models/Post')
class PostController {
    async store({request, response, auth}){
        const data = request.only(['title', 'body'])
        const user = await auth.getUser()
        const post = new Post()
        post.title = data['title']
        post.body = data['body']
        post.user = user['username']
        await post.save()
        return response.created({
            status: true,
            data: post
        })
        
    }

    async index({request, response}){
        const posts = await Post.all()
        
        return response.ok({
           status: true,
           data: posts
        })
    }

    async delete({request, response, params}){
        const id = params.id
        const post = await Post.find(id)

        if(await post.delete()){
            return response.status(200).json({
                status: true,
                message: "Post eliminado correctamente"
            })
        }
        return response.status(400).json({
            status: false,
             message: "No se pudo eliminar el post"
        })


    }

    async update({params, request,response}){
        const data = request.only(['id','title', 'body'])
        const posto = new Post()
        posto.id = data['id']
        posto.title = data['title']
        posto.body = data['body']
        
        if (await Post.query()
        .where('id', posto.id)
        .update({'body': posto.body, 'title': posto.title, 'updated_at': Date()})){
         return response.status(200).json({
             status: true,
             message: "Post Actualizado correctamente"
         })
        }
        return response.status(400).json({
            status: false,
             message: "Post no actualizado"
        })
        
      
    }

}

module.exports = PostController
