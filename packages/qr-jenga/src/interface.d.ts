export interface QrJengaInterface {
    readonly size: number;
    readonly removed: number;
    get(x: number, y: number): boolean;
    remove(x: number, y: number): boolean;
}
export interface QrGraphicsInterface {
    readonly size: number;
    rect(x: number, y: number, w: number, h: number): void;
    toImageData(): ImageData;
}
