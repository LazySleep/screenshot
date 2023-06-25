import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToForeignObjectSvg<T extends Node>(node: T, options?: Options): Promise<SVGElement>;
export declare function domToForeignObjectSvg<T extends Node>(context: Context<T>): Promise<SVGElement>;
