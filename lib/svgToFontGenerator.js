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
const svgtofont_1 = __importDefault(require("svgtofont"));
const path = __importStar(require("path"));
// 创建一个类，用来处理webpack
class Svg2Icon {
    constructor(options) {
        this.options = '';
        this.options = options;
    }
    // 创建一个webpack的plugin
    apply(compiler) {
        compiler.hooks.emit.tap('ConvertSvg2FontPlugin', (compilation) => {
            // 如果没有src，则不处理
            if (!this.options.src) {
                return;
            }
            (0, svgtofont_1.default)(Object.assign(Object.assign({}, this.options), { src: this.options.src, dist: this.options.dist || path.resolve(process.cwd(), 'fonts'), fontName: this.options.fontName || 'svgtofont', css: this.options.css !== undefined ? this.options.css : true })).then(() => {
                console.log('done!');
            });
        });
    }
}
module.exports = Svg2Icon;
