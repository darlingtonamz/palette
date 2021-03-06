'use strict'

const Model = use('Model')
const ModelHook = use('App/Models/Hooks/ModelHook')

class PaletteLike extends Model {
  static boot () {
    super.boot()
    this.addTrait('Filter', {scopes: []})
    this.addHook('beforeSave', 'ModelHook.validate');
  }

  validate(){
    return ModelHook.validate(this)
  }
}

PaletteLike.rules = {
  palette_id:   'required',
  // unique_id:    'required'
}

module.exports = PaletteLike
