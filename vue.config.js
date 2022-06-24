const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    }
  }
})
