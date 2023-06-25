import type { Context } from './context';
export declare function copyCssStyles<T extends HTMLElement | SVGElement>(node: T, cloned: T, isRoot: boolean, context: Context): Map<string, [string, string]>;
