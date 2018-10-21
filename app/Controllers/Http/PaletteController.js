'use strict'

const Palette = use('App/Models/Palette')
const ApplicationController = use('App/Controllers/Http/ApplicationController')

class PaletteController extends ApplicationController {
  async index (ctx) {
    const { request, response } = ctx

    const query = request._all
    const palettes = await Palette.query()
    .filter(query).paginate(query.page)

    response.status(200).json({
      message: 'Palette list.',
      data: palettes
    })
  }

  async store (ctx) {
    const { request, response } = ctx
    // super.authorize(ctx, 'store')

    const palette = paletteParams(request)
    await Palette.create(palette)
    .then(async (result)=>{
      response.status(201).json({
        message: 'Successfully created a new Palette',
        data: result
      })
    }).catch((err)=>{
      response.status(422).json({
        message: 'Failed creating Palette',
        data: err.message
      })
    })

  }

  async show (ctx) {
    const { request, response } = ctx

    const palette = request.post().model

    response.status(200).json({
      message: 'Here is your Palette.',
      data: palette
    })
  }

  // async update (ctx) {
  //   const { request, response } = ctx
  //   super.authorize(ctx, 'update')

  //   var palette = request.post().model
  //   palette.merge(paletteParams(request))

  //   await palette.save()
  //   .then((result)=>{
  //     response.status(200).json({
  //       message: 'Palette successfully updated.',
  //       data: result
  //     })
  //   }).catch((err)=>{
  //     response.status(422).json({
  //       message: 'Failed updating Palette',
  //       data: err.message
  //     })
  //   })
  // }

  async destroy (ctx) {
    const { request, response } = ctx
    const palette = request.post().model
    const uniqueId = request.post()['unique_id']

    if(uniqueId === palette['unique_id']) {
      await palette.delete()
      .then((result)=>{
        response.status(200).json({
          message: 'Palette successfully deleted.',
          data: result
        })
      }).catch((err)=>{
        response.status(422).json({
          message: 'Failed deleting Palette',
          data: err.message
        })
      })
    } else {
      response.status(403).json({
        message: 'Unauthorized. Palette doesn\'t belong to you',
      })
    }
  }
}

function paletteParams(request) {
  const fields = ['name', 'description', 'hexs', 'unique_id']
  return ApplicationController.getParams(request.post(), fields)
}

module.exports = PaletteController
