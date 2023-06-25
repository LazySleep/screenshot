import type { Context } from './context';
export declare function cloneElement<T extends HTMLElement | SVGElement>(node: T, context: Context): (HTMLElement | SVGElement) | Promise<HTMLElement | SVGElement>;
