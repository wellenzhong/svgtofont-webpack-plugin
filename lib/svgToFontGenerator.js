"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/*
 * @Author: wellen zhong
 * @Date: 2022-02-09 08:57:24
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-09 15:14:56
 * @Description: file content
 */
const svgtofont_1 = __importDefault(require("svgtofont"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsTpl_1 = __importDefault(require("./jsTpl"));
const svgstore = require("svgstore");
const sprites = svgstore({ inline: true });
// 创建一个类，用来处理webpack
class Svg2Icon {
    constructor(options) {
        this.options = "";
        this.options = options;
    }
    // 创建一个webpack的plugin
    apply(compiler) {
        compiler.hooks.emit.tap("ConvertSvg2FontPlugin", (compilation) => {
            // 如果没有src，则不处理
            if (!this.options.src) {
                return;
            }
            const svgSrc = path.resolve(process.cwd(), this.options.src);
            const dist = this.options.dist || path.resolve(process.cwd(), "fonts");
            const fontName = this.options.fontName || "svgIconfont";
            svgtofont_1.default(Object.assign(Object.assign({}, this.options), { src: this.options.src, dist: dist, fontName: fontName, css: this.options.css !== undefined ? this.options.css : true })).then(() => {
                const files = fs_1.default.readdirSync(svgSrc);
                files.map((filename) => {
                    const arr = filename.split(".");
                    const id = arr.slice(0, arr.length - 1).join(".");
                    sprites.add(id, fs_1.default.readFileSync(path.resolve(process.cwd(), this.options.src) + "/" + filename), { cleanDefs: true, symbolAttrs: true });
                });
                fs_1.default.writeFileSync(`${dist}/${fontName}-sprite.svg`, sprites);
                fs_1.default.readFile(`${dist}/${fontName}-sprite.svg`, { encoding: "utf-8" }, (err, svgStr) => {
                    const tpl = jsTpl_1.default({ svgStr });
                    setTimeout(() => {
                        fs_1.default.writeFileSync(dist + "/" + fontName + ".js", tpl, "utf-8");
                    }, 0);
                });
            });
        });
    }
}
module.exports = Svg2Icon;
