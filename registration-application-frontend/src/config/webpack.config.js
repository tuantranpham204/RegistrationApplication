const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      'jet-views': path.resolve(__dirname, 'src/views'),
      // 'jet-models': path.resolve(__dirname, 'src/models'),
      // 'webix': path.resolve(__dirname, 'node_modules/webix/webix.min.js'),
      // 'webix-jet': path.resolve(__dirname, 'node_modules/webix-jet/jet.js')
    },
    extensions: ['.js'],
    fallback: {
      fs: false,
      path: false
    }
  },
  target: 'web',
  stats: {
    errorDetails: true,
    warningsFilter: [/Critical dependency: the request of a dependency is an expression/]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       webix: {
  //         test: /[\\/]node_modules[\\/]webix[\\/]/,
  //         name: 'webix',
  //         chunks: 'all'
  //       },
  //       webixJet: {
  //         test: /[\\/]node_modules[\\/]webix-jet[\\/]/,
  //         name: 'webix-jet',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
};