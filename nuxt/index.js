import path from 'path'
import defu from 'defu'

const defaultOptions = {}

module.exports = function (moduleOptions) {
  const options = defu({
    ...this.options.notion,
    ...moduleOptions
  }, defaultOptions)

  this.nuxt.hook('build:before', () => {
    console.log('this.options.build => ', this.options.build)

    // Enable transpilation of `src/` directory
    this.options.build.transpile.push('vue-notion')

    console.log('this.options.build after => ', this.options.build)

    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      fileName: 'vue-notion.js'
    })
  })
}

module.exports.meta = require('../package.json')

// export default NotionModule

//export const meta = require('../package.json')