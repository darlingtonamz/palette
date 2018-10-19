'use strict'
class FindItem {
  async handle (ctx, next, schemes) {
    const { request, response } = ctx
    const id = ctx.params[schemes[1] || 'id']

    const Model = use(`App/Models/${schemes[0]}`)
    const model = await Model.find(id)
    if (!(model && model.id)) {
      return response.status(404).json({
        message: `${schemes[0]} not found.`,
        id
      })
    }

    if (schemes[1]) {
      request.body.parentModel = model
    } else {
      request.body = {model}
    }

    await next()
  }
}

module.exports = FindItem
