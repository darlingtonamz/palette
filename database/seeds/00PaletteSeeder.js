const Factory = use('Factory')
const Database = use('Database')

class PaletteSeeder {
  async run () {
    const palettes = await Database.table('palettes')
    console.log(palettes)
  }
}

module.exports = PaletteSeeder