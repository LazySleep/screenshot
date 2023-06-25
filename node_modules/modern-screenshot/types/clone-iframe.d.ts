import type { Context } from './context';
export declare function cloneIframe<T extends HTMLIFrameElement>(iframe: T, context: Context): HTMLIFrameElement | Promise<HTMLBodyElement>;
