import type webpack from "webpack";
declare class Svg2Icon {
    options: any;
    constructor(options: any);
    apply(compiler: webpack.Compiler): void;
}
export = Svg2Icon;
