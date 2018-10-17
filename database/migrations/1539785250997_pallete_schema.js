'use strict'

const Schema = use('Schema')

class PaletteSchema extends Schema {
  up () {
    this.create('palettes', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.jsonb('colorHexs')
      table.timestamps()
    })
  }

  down () {
    this.drop('palettes')
  }
}

module.exports = PaletteSchema
