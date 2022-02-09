/*
 * @Author: wellen zhong
 * @Date: 2022-02-09 08:57:24
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-09 15:14:56
 * @Description: file content
 */
import svgtofont from "svgtofont";
import * as path from "path";
import type webpack from "webpack";
import fs from "fs";
import templateFun from "./jsTpl";
const svgstore = require("svgstore");
const sprites = svgstore({ inline: true });

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
      const svgSrc: string = path.resolve(process.cwd(), this.options.src);
      const dist: string =
        this.options.dist || path.resolve(process.cwd(), "fonts");
      const fontName: string = this.options.fontName || "svgIconfont";
      svgtofont({
        ...this.options,
        src: this.options.src,
        dist: dist,
        fontName: fontName,
        css: this.options.css !== undefined ? this.options.css : true,
      }).then(() => {
        const files = fs.readdirSync(svgSrc);
        files.map((filename) => {
          const arr = filename.split(".");
          const id = arr.slice(0, arr.length - 1).join(".");
          sprites.add(
            id,
            fs.readFileSync(
              path.resolve(process.cwd(), this.options.src) + "/" + filename
            ),
            { cleanDefs: true, symbolAttrs: true }
          );
        });
        fs.writeFileSync(`${dist}/${fontName}-sprite.svg`, sprites);
        fs.readFile(
          `${dist}/${fontName}-sprite.svg`,
          { encoding: "utf-8" },
          (err, svgStr) => {
            const tpl = templateFun({ svgStr });
            setTimeout(() => {
              fs.writeFileSync(dist + "/" + fontName + ".js", tpl, "utf-8");
            }, 0);
          }
        );
      });
    });
  }
}

export = Svg2Icon;
