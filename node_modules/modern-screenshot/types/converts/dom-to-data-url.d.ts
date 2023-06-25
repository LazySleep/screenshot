import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToDataUrl<T extends Node>(node: T, options?: Options): Promise<string>;
export declare function domToDataUrl<T extends Node>(context: Context<T>): Promise<string>;
