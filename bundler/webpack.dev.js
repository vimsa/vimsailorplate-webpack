const { merge } = require("webpack-merge")
const path = require("path")

const config = require("./webpack.config")

module.export = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        writeToDisk: true
    },
    output: {
        path: path.resolve(__dirname, "../dist")
    }
})