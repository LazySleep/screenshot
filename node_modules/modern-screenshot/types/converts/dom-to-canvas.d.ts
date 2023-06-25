import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToCanvas<T extends Node>(node: T, options?: Options): Promise<HTMLCanvasElement>;
export declare function domToCanvas<T extends Node>(context: Context<T>): Promise<HTMLCanvasElement>;
