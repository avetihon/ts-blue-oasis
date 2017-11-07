'use strict';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // Note: __dirname refers to the directory where this webpack.config.js lives
    entry: {
        'app': path.resolve(__dirname, './public/Main.ts'),
        'polyfills': path.resolve(__dirname, './public/polyfills.ts'),
        'vendor': path.resolve(__dirname, './public/vendor.ts'),
        'style': path.resolve(__dirname, './public/style.ts')
    },
    output: {
        filename: './build/[name].bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: { configFileName: 'develop.tsconfig.json' } },
                    { loader: 'angular2-template-loader'}
                ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { url: false } },
                        { loader: 'postcss-loader' }
                    ]
                })
            }
        ],
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            // Shares common code between the pages.
            names: ['style', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /@angular(\\|\/)core(\\|\/)/,
            path.resolve('./public'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        new ExtractTextPlugin('./build/style.css')
        // new BundleAnalyzerPlugin()
    ]
};

/*

CommonsChunkPlugin divide vendor modules into separate file

ContextReplacementPlugin used because of this issue https://github.com/angular/angular/issues/11580
*/
