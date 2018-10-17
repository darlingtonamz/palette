'use strict'

const _ = require('lodash')
class Filter {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    var getQueries = function (queries) {
      return _.pick(queries, customOptions.scopes)
    }

    Model.scopeFilter = function(query, filteringParams) {
      // console.log('ARG', filteringParams)
      const params = getQueries(filteringParams)
      for (var key in params) {
        if (params[key] && (params[key].length > 0)) {
          query = query[key](params[key])
        }

      };
    }
  }
}

module.exports = Filter
