import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToJpeg<T extends Node>(node: T, options?: Options): Promise<string>;
export declare function domToJpeg<T extends Node>(context: Context<T>): Promise<string>;
