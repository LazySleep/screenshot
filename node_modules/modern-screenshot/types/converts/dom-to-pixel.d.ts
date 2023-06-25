import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToPixel<T extends Node>(node: T, options?: Options): Promise<Uint8ClampedArray>;
export declare function domToPixel<T extends Node>(context: Context<T>): Promise<Uint8ClampedArray>;
