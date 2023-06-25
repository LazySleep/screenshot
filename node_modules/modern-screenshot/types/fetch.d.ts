import type { Context } from './context';
export type BaseFetchOptions = RequestInit & {
    url: string;
    timeout?: number;
    responseType?: 'text' | 'dataUrl';
};
export type ContextFetchOptions = BaseFetchOptions & {
    requestType?: 'text' | 'image';
    imageDom?: HTMLImageElement | SVGImageElement;
};
export declare function baseFetch(options: BaseFetchOptions): Promise<string>;
export declare function contextFetch(context: Context, options: ContextFetchOptions): Promise<string>;
