var path = require('path');

module.exports = {
    entry: {
        index: './js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['env'],
            },
        }]
    }
};