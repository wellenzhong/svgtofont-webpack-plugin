<!--
 * @Author: wellen zhong
 * @Date: 2022-02-09 08:57:24
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-11 17:43:29
 * @Description: file content
-->
# svgtofont-webpack-plugin
A webpack plugin for converting svg files to one font file. You can use the font as iconfont.Supports css/eot/less/stylus/sass/svg/ttf/woff/woff2, and supports svg sprite. Most importantly, it supports generating js file, you can import js file to you project directly, this feature supports antd/icons well.


## Install
```
npm install svgtofont-webpack-plugin --save-dev
```
## Useage
There is the example following:

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
## API
### src
> Required, it is the source directory of svg files.
> Type: `String`  

### dist
Optional, it is the destination directory of font files.
> Type: `String`  
> Default value:  `fonts`  
### `filename` 
Optional, it is the name of font file.
> Type: `String`  
> Default value:  `svgIconfont`  
### Other configuration

Please check this package  [svgtofont](https://www.npmjs.com/package/svgtofont) for more options.svgtofont-webpack-plugin is based on svgtofont.

## Contribute
First of all,You should install `svgtofont-webpack-plugin` in local enviroment via cli `npm link`.

Secondly,if you need to test the plugin,you can use the example, also, you need to `npm link` in the example directory.
and then you can run `npm run build:fonts` to test the plugin.

## Issues

If there is any issues, plz let me know or help to fix it ;)

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).