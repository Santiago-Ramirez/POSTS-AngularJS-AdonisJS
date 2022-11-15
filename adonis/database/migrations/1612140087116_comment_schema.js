'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.string('body', 150).notNullable()
      table.string('user', 80).references('username').inTable('users')
      table.integer('post_id', 20).unsigned().references('id').inTable('posts').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
