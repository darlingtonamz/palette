'use strict'
class FindItem {
  async handle (ctx, next, schemes) {
    // { request, response, params: {id} }
    const { request, response } = ctx
    const id = ctx.params[schemes[1] || 'id']
    // schemes = [ModelName, parentId]
    const Model = use(`App/Models/${schemes[0]}`)
    const model = await Model.find(id)
    if (!model) {
      return response.status(404).json({
        message: `${schemes[0]} not found.`,
        id
      })
    }
    // debugger

    if (schemes[1]) {
      request.body.parentModel = model
      // debugger
    } else {
      request.body.model = model
      request.body.item = model
      // debugger
    }

    await next()
  }
}

module.exports = FindItem
