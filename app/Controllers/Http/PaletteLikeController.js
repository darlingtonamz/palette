'use strict'

const PaletteLike = use('App/Models/PaletteLike')
const ApplicationController = use('App/Controllers/Http/ApplicationController')

class PaletteLikeController extends ApplicationController {
  // async index (ctx) {
  //   const { request, response } = ctx

  //   const query = request._all //request.input
  //   const organization = await request.post().parentModel
  //   const paletteLikes = await organization.paletteLikes()
  //   .filter(query).paginate(query.page)

  //   response.status(200).json({
  //     message: 'PaletteLike list.',
  //     data: paletteLikes
  //   })
  // }

  async store (ctx) {
    const { request, response } = ctx
    const palette = await request.post().parentModel
    var paletteLike = paletteLikeParams(request)
    paletteLike['palette_id'] = palette.id

    await PaletteLike.create(paletteLike)
    .then(async (result)=>{
      response.status(201).json({
        message: 'Successfully created a new PaletteLike',
        data: result
      })
    }).catch((err)=>{
      response.status(422).json({
        message: 'Failed creating PaletteLike',
        data: err.message
      })
    })
  }

  async show (ctx) {
    const { request, response } = ctx
    const paletteLike = request.post().model

    response.status(200).json({
      message: 'Here is your PaletteLike.',
      data: paletteLike
    })
  }

  async destroy (ctx) {
    const { request, response } = ctx
    const paletteLike = request.post().model

    await paletteLike.delete()
    .then((result)=>{
      response.status(200).json({
        message: 'Contract successfully deleted.',
        data: result
      })
    }).catch((err)=>{
      response.status(422).json({
        message: 'Failed deleting PaletteLike',
        data: err.message
      })
    })
  }
}

function paletteLikeParams(request) {
  const fields = ['name', 'description', 'hexs']
  return ApplicationController.getParams(request.post(), fields)
}

module.exports = PaletteLikeController
