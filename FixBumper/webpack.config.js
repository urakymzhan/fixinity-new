var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module : {
        rules : [
            {test : /\.(js|jsx)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
              },
            {test: /\.(png|jpe?g|gif)$/i, use: ['file-loader' ]},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {test: /\.(png|jpg|gif)$/i, use: ['url-loader']},
        ]
    },
    // this and publicPath: '/' is needed when refreshing same url.
    // index.html page will likely have to be served in place of any 404 responses.

    devServer: {
        historyApiFallback: true,
        // this makes sure to proxy backend 5000 to client 8080
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://0.0.0.0:5000',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api':'' // removes /api
                  }
            }
        }
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './src/index.html'
        })
    ]

};