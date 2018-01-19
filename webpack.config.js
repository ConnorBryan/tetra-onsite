/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const envConfig = require('./config');

const isProduction = envConfig.NODE_ENV === 'production';

const plugins = [
	// new webpack.optimize.ModuleConcatenationPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': `"${envConfig.NODE_ENV}"`,
		'CONFIG.API_BASE_URL': `"${envConfig.API_BASE_URL}"`,
		'CONFIG.ALGOLIA_UTTERANCES_INDEX': `"${envConfig.ALGOLIA_UTTERANCES_INDEX}"`,
		'CONFIG.STRIPE_API_KEY': `"${envConfig.STRIPE_API_KEY}"`,
		'CONFIG.INTERCOM_APP_ID': `"${envConfig.INTERCOM_APP_ID}"`,
		'CONFIG.BRANCH_KEY': `"${envConfig.BRANCH_KEY}"`
	})
];

if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({})
	);
}

const config = {
	resolve: {
		alias: { // allow imports to be made relative to `src` directory instead of relative to importing file
			'src': path.join(__dirname, 'src')
		}
	},

	entry: 'src/app.js', // application's entry point

	devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map', // how to generate source maps https://webpack.js.org/configuration/devtool/

	devServer: isProduction ? {} : envConfig.DEV_SERVER,

	output: {
		path: path.join(__dirname, 'build'), // save output to `build` directory
		filename: 'bundle.js', // write output to `bundle.js`
		publicPath: envConfig.OUTPUT_PUBLIC_PATH // path appended to any additional files (images, code bundles, etc)
	},

	module: {
		rules: [
			// process .js files through babel
			{
				include: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},

			// allow and encapsulate css imports
			{
				include: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'./webpack-loaders/css-encapsulation-loader',
					'sass-loader'
				] // webpack loader order operate in reverse; execution order is Scss -> Encapsulate -> Css -> Style
			},

			// Load images
			{
				include: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							hash: 'sha512',
							digest: 'hex',
							name: '[hash].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true
						}
					}
				]
			},

			// Load fonts
			{
				include: /\.(eot|woff|woff2|ttf)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							hash: 'sha512',
							digest: 'hex',
							name: '[hash].[ext]'
						}
					}
				]
			}
		],
	},

	plugins
};

module.exports = config;
