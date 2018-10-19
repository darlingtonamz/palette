'use strict'

const Model = use('Model')
const ModelHook = use('App/Models/Hooks/ModelHook')

class Palette extends Model {
  static boot () {
    super.boot()
    this.addTrait('Filter', {scopes: []})
    this.addHook('beforeSave', 'ModelHook.validate');
  }

  validate(){
    return ModelHook.validate(this)
  }

  paletteLikes () { return this.hasMany('App/Models/PaletteLike')}
}

Palette.rules = {
  name:         'required',
  // description:  'required',
  hexs:         'required',
  unique_id:    'required'
}
module.exports = Palette
