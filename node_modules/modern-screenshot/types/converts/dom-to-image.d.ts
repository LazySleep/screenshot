import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToImage<T extends Node>(node: T, options?: Options): Promise<HTMLImageElement>;
export declare function domToImage<T extends Node>(context: Context<T>): Promise<HTMLImageElement>;
