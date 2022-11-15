'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

    post (){
        this.belongsTo('App/Models/Post')
    }

    user (){
        this.belongsTo('App/Models/User')
    }
}

module.exports = Comment
