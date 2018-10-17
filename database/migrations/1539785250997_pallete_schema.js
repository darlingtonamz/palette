'use strict'

const Schema = use('Schema')

class PaletteSchema extends Schema {
  up () {
    this.create('palettes', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.jsonb('hexs')
      table.string('unique_id').notNullable()
      table.integer('like_count').unsigned().defaultTo(0)

      table.unique(['name', 'unique_id'])

      table.timestamps()
    })
  }

  down () {
    this.drop('palettes')
  }
}

module.exports = PaletteSchema
