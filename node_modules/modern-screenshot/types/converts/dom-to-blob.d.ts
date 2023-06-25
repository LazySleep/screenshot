import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToBlob<T extends Node>(node: T, options?: Options): Promise<Blob>;
export declare function domToBlob<T extends Node>(context: Context<T>): Promise<Blob>;
