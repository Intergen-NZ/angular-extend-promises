module.exports = (config) ->
  config.set
    basePath: '..'

    frameworks: [
      'mocha'
      'chai'
      'chai-as-promised'
      'sinon-chai'
    ]

    captureTimeout: 10000
