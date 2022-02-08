

    import svgtofont from 'svgtofont';
    import * as path from 'path';
    import type webpack from 'webpack';
    // 创建一个类，用来处理webpack
    class Svg2Icon {
        options: any = ''
        constructor(options: any) {
            this.options = options;
        }
        // 创建一个webpack的plugin
        apply(compiler: webpack.Compiler) {
            compiler.hooks.emit.tap('ConvertSvg2FontPlugin', (compilation) => {
                // 如果没有src，则不处理
                if (!this.options.src) {
                    return;
                }
                svgtofont({
                    ...this.options,
                    src: this.options.src,
                    dist: this.options.dist || path.resolve(process.cwd(), 'fonts'),
                    fontName: this.options.fontName || 'svgtofont',
                    css: this.options.css!== undefined ? this.options.css : true,
                }).then(() => {
                    console.log('done!');
                  });
            });
        }
    }

    export = Svg2Icon;
