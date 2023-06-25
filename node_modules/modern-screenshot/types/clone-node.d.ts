import type { Context } from './context';
export declare function cloneNode<T extends Node>(node: T, context: Context, isRoot?: boolean): Promise<Node>;
