'use strict'

const PaletteLike = use('App/Models/PaletteLike')
const ApplicationController = use('App/Controllers/Http/ApplicationController')

class PaletteLikeController extends ApplicationController {
  async index (ctx) {
    const { request, response } = ctx

    const query = request._all //request.input
    const palette = await request.post().parentModel
    const paletteLikes = await palette.paletteLikes()
    .filter(query).paginate(query.page)

    response.status(200).json({
      message: 'PaletteLike list.',
      data: paletteLikes
    })
  }

  async store (ctx) {
    const { request, response } = ctx
    const palette = await request.post().parentModel

    const existingLikes = (await palette.likes().where('unique_id', palette['unique_id']).fetch())

    var paletteLike = paletteLikeParams(request)
    paletteLike['palette_id'] = palette.id

    if (!existingLikes.rows.length > 0) {
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
    } else {
      // console.log('Existing', existingLikes.toJSON())
      ctx.request.body.model = existingLikes.rows[0]
      await this.destroy(ctx)
    }
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
    const palette = request.post().parentModel
    // console.log(request.body)+
    const uniqueId = request.post()['unique_id']

    if(uniqueId === palette['unique_id']) {
      await paletteLike.delete()
      .then((result)=>{
        response.status(200).json({
          message: 'PaletteLike successfully deleted.',
          data: result
        })
      }).catch((err)=>{
        response.status(422).json({
          message: 'Failed deleting PaletteLike',
          data: err.message
        })
      })
    } else {
      response.status(403).json({
        message: 'Unauthorized. PaletteLike doesn\'t belong to you',
      })
    }
  }
}

function paletteLikeParams(request) {
  const fields = ['unique_id']
  return ApplicationController.getParams(request.post(), fields)
}

module.exports = PaletteLikeController
