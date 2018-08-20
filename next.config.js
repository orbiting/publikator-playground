const path = require('path')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')

require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env',
})

module.exports = {
  webpack: function(config) {
    const env = Object.keys(process.env).reduce(
      (acc, curr) => {
        acc[
          `process.env.${curr}`
        ] = JSON.stringify(process.env[curr])
        return acc
      },
      {}
    )

    config.plugins.push(
      new webpack.DefinePlugin(env)
    )
    config.plugins.push(new Visualizer())
    config.resolve.alias = {
      '@orbiting/transform': path.resolve(
        __dirname,
        'packages/transform/'
      ),
      '@orbiting/publikator-editor': path.resolve(
        __dirname,
        'packages/editor/'
      ),
      '@orbiting/publikator-modules': path.resolve(
        __dirname,
        'packages/modules/'
      ),
      '@orbiting/publikator-templates': path.resolve(
        __dirname,
        'packages/templates/'
      ),
    }
    return config
  },
}
