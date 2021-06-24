const path = require("path")
const webpack = require("webpack")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");


const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, "../src/app")
const dirStyles = path.join(__dirname, "../src/styles")
const dirStatic = path.join(__dirname, "../src/static")
const dirNode = path.join(__dirname, "../node_modules")

// console.log(dirApp, dirStyles, dirStatic, dirNode)

module.exports = {
   entry: [
      path.join(dirApp, "index.js"),
      path.join(dirStyles, "index.scss")
   ],

   output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, '../dist')
   },

   resolve: {
      modules: [
         dirApp,
         dirStyles,
         dirStatic,
         dirNode
      ],
   },

   plugins: [

      new webpack.DefinePlugin({
         IS_DEVELOPMENT
      }),

      new CopyWebpackPlugin({
         patterns: [
            {
               from: "./src/static",
               to: ""
            }
         ]
      }),

      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css",
      }),

      new ImageMinimizerPlugin({
         minimizerOptions: {
            plugins: [
               ["gifsicle", { interlaced: true }],
               ["jpegtran", { progressive: true }],
               ["optipng", { optimizationLevel: 5 }],
            ]
         }
      }),

      new CleanWebpackPlugin()
   ],

   module: {
      rules: [

         /**
          * Javascript
          */
         {
            test: /\.js$/,
            use: {
               loader: "babel-loader"
            }
         },

         /**
          * SCSS
          */
         {
            test: /\.scss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: ""
                  },
               },
               {
                  loader: "css-loader"
               },
               {
                  loader: "postcss-loader"
               },
               {
                  loader: "sass-loader"
               },
            ]
         },

         /**
          * Images and Fonts
          */
         {
            test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
            loader: "file-loader",
            options: {
               name(file) {
                  return "[hash].[ext]"
               }
            }
         },
         {
            test: /\.(jpe?g|png|gif|svg|webp)$/i,
            use: [
               {
                  loader: ImageMinimizerPlugin.loader,

               },
            ],
         },

         // Shaders
         {
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: [
               'raw-loader',
               'glslify-loader'
            ]
         }
      ]
   },

   optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
   },
}
