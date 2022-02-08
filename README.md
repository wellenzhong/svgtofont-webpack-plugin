# svgtofont-webpack-plugin
A webpack plugin for convert a folder with svg files to one font file. You can use the font as iconfont.


## Install
```
npm install svgtofont-webpack-plugin --save-dev
```
## Useage
There is the example

```javascript
// example 
// webpack.config.js
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
```
Please check this package  [svgtofont](https://www.npmjs.com/package/svgtofont) for more info.svgtofont-webpack-plugin is basic on svgtofont.

## Issues

If there is any issues, plz let me know or help to fix it ;)

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).