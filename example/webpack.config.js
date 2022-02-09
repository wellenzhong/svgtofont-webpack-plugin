/*
 * @Author: wellen zhong
 * @Date: 2022-02-09 08:57:24
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-09 14:25:31
 * @Description: file content
 */
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