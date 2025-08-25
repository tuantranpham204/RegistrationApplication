const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const pack = require("./package.json")
module.exports = function (env) {
	var production = !!(env && env.production === "true")
	var babelSettings = { extends: path.join(__dirname, '/.babelrc') }
	var config = {
		mode: production ? "production" : "development",
		entry: { app: "./src/app.js" },
		output: {
			path: path.join(__dirname, "public", "codebase"),
			publicPath: "/codebase/",
			filename: "[name].js",
			chunkFilename: "[name].bundle.js"
		},
		module: {
			rules: [
				{ test: /\.js$/, use: "babel-loader?" + JSON.stringify(babelSettings) },
				{ test: /\.(svg|png|jpg|gif)$/, use: "url-loader" },
				{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
			]
		},
		stats: "minimal",
		resolve: {
			extensions: [".js"],
			modules: ["node_modules"],
			alias: {
				"jet-views": path.resolve(__dirname, "src", "views"),
        "jet-locales": path.resolve(__dirname, "src", "locales"),
        "apis": path.resolve(__dirname, "src", "apis"),
			}
		},
		plugins: [
			new MiniCssExtractPlugin({ filename: "[name].css" }),
			new webpack.DefinePlugin({ VERSION: `"${pack.version}"`, APPNAME: `"${pack.name}"`, PRODUCTION: production })
		],
		devServer: {
			stats: "errors-only",
			contentBase: "./public/",
			proxy: { "/api": "http://127.0.0.1:3000"} 
		}
	}
	if (!production) {
		config.devtool = "inline-source-map"
	}
	return config
}