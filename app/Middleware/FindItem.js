'use strict'
class FindItem {
  async handle (ctx, next, schemes) {
    // { request, response, params: {id} }
    const { request, response } = ctx
    const id = ctx.params[schemes[1] || 'id']
    // schemes = [ModelName, parentId]
    const Model = use(`App/Models/${schemes[0]}`)
    const model = await Model.find(id)
    if (!(model && model.id)) {
      return response.status(404).json({
        message: `${schemes[0]} not found.`,
        id
      })
    }
    // debugger

    if (schemes[1]) {
      request.body.parentModel = model
      // request.body = {parentModel: model}
    console.log('Data 1', request.body)

      // debugger
    } else {
      // request.body = {sd: "SdSD"}
      request.body = {model}
    // console.log('Data 2', request.body)
    // debugger
    }
    // console.log('Data', request.body)

    await next()
  }
}

module.exports = FindItem
