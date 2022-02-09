/*
 * @Author: wellen zhong
 * @Date: 2022-02-09 08:57:24
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-09 14:46:44
 * @Description: file content
 */
import svgtofont from "svgtofont";
import * as path from "path";
import type webpack from "webpack";
import fs from "fs";
import templateFun from "./jsTpl";
const svgstore = require('svgstore');
const sprites = svgstore({inline:true})

// 创建一个类，用来处理webpack
class Svg2Icon {
  options: any = "";
  constructor(options: any) {
    this.options = options;
  }
  // 创建一个webpack的plugin
  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tap("ConvertSvg2FontPlugin", (compilation) => {
      // 如果没有src，则不处理
      if (!this.options.src) {
        return;
      }
      svgtofont({
        ...this.options,
        src: this.options.src,
        dist: this.options.dist || path.resolve(process.cwd(), "fonts"),
        fontName: this.options.fontName || "svgtofont",
        css: this.options.css !== undefined ? this.options.css : true,
      }).then(() => {
        fs.readFile(
          (this.options.dist || path.resolve(process.cwd(), "fonts")) + "/" + "svgtofont.symbol.svg",
          { encoding: "utf-8" },
          (err, svgStr) => {
              console.log('%c 🍶 svgStr: ', 'font-size:12px;background-color: #42b983;color:#fff;', svgStr);
            const tpl = templateFun({ svgStr });
            setTimeout(() => {
              fs.writeFileSync(
                (this.options.dist || path.resolve(process.cwd(), "fonts")) + "/" + "svgtofont.js",
                tpl,
                "utf-8"
              );
            }, 0);
          }
        );
      });
    });
  }
}

export = Svg2Icon;
