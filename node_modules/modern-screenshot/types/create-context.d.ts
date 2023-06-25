import type { Context } from './context';
import type { Options } from './options';
export declare function orCreateContext<T extends Node>(context: Context<T>): Promise<Context<T>>;
export declare function orCreateContext<T extends Node>(node: T, options?: Options): Promise<Context<T>>;
export declare function createContext<T extends Node>(node: T, options?: Options & {
    autoDestruct?: boolean;
}): Promise<Context<T>>;
export declare function createStyleElement(ownerDocument?: Document): HTMLStyleElement | undefined;
