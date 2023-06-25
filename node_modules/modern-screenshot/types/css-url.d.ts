import type { Context } from './context';
export declare function replaceCssUrlToDataUrl(cssText: string, baseUrl: string | null, context: Context, isImage?: boolean): Promise<string>;
export declare function hasCssUrl(cssText: string): boolean;
export declare const URL_RE: RegExp;
