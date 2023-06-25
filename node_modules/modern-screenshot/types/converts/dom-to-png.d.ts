import type { Context } from '../context';
import type { Options } from '../options';
export declare function domToPng<T extends Node>(node: T, options?: Options): Promise<string>;
export declare function domToPng<T extends Node>(context: Context<T>): Promise<string>;
