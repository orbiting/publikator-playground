const path = require('path')
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
    config.resolve.alias = {
      '@orbiting/transform': path.resolve(
        __dirname,
        'packages/transform/'
      ),
      '@orbiting/publikator-editor': path.resolve(
        __dirname,
        'packages/editor/'
      ),
      '@orbiting/publikator-plugins': path.resolve(
        __dirname,
        'packages/plugins/'
      ),
      '@orbiting/publikator-templates': path.resolve(
        __dirname,
        'packages/templates/'
      ),
      '@orbiting/publikator-transformers': path.resolve(
        __dirname,
        'packages/transformers/'
      ),
      '@orbiting/next-app': path.resolve(
        __dirname,
        'packages/next-app/'
      ),
      '@self/settings': path.resolve(
        __dirname,
        'lib/settings'
      ),
    }
    return config
  },
}
