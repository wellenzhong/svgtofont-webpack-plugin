const SvgToFontPlugin = require('svgtofont-webpack-plugin').default;
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    plugins: [new SvgToFontPlugin({src:__dirname + '/src/svg-icons'})],
}