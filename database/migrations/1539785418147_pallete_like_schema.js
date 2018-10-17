'use strict'

const Schema = use('Schema')

class PaletteLikeSchema extends Schema {
  up () {
    this.create('palette_likes', (table) => {
      table.increments()
      table.integer('palette_id').notNullable().unsigned()
      table.string('unique_id').notNullable()
      // customer_id if existstomer_id').unsigned()

      table.foreign('palette_id')
        .references('palettes.id')

      table.unique(['palette_id', 'unique_id'])

      table.timestamps()
    })
  }

  down () {
    this.drop('palette_likes')
  }
}

module.exports = PaletteLikeSchema
