'use strict'

const Hash = use('Hash')

const ModelHook = module.exports = {}
const { validateAll } = use('Validator')

ModelHook.hashPassword = async (modelInstance) => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password)
  }
}

ModelHook.validate = async (model) => {
  // debugger
  const rules = model.constructor.rules
  const validation = await validateAll(model.$attributes, rules);

  if (validation.fails()) {
    // debugger
    // throw new Error(`Validation error: ${JSON.stringify(validation.messages())}, \nJSON: ${JSON.stringify(model.$attributes)}`)
    throw new Error(
      JSON.stringify({
        message: validation.messages(),
        attributes: model.$attributes
      })
    )

    // return validation.messages();
  }
  return true;
}
