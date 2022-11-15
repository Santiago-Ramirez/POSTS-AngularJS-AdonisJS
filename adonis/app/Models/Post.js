'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    user (){
        this.belongsTo('App/Models/User')
    }

    comments (){
        this.hasMany('App/Models/Comment')
    }

}

module.exports = Post
