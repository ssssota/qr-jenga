export interface QrCodeGraphicsInterface {
	readonly size: number;
	rect(x: number, y: number, w: number, h: number): void;
	toImageData(): ImageData;
}

export type RGBA = [number, number, number, number];

class QrCodeGraphics implements QrCodeGraphicsInterface {
	private matrix: RGBA[];
	get size() {
		return this._size;
	}

	constructor(private _size: number) {
		this.matrix = [...Array(_size * _size)].map(() => [0xff, 0xff, 0xff, 0xff]);
	}

	private setPixel(x: number, y: number, rgba: RGBA) {
		this.matrix[x + y * this.size] = rgba;
	}

	rect(x: number, y: number, w: number, h: number) {
		for (let i = 0; i < w; i++)
			for (let j = 0; j < h; j++) this.setPixel(x + i, y + j, [0, 0, 0, 0]);
	}

	toImageData(): ImageData {
		return {
			data: new Uint8ClampedArray(this.matrix.flat()),
			width: this.size,
			height: this.size
		};
	}
}

export const createQrCodeGraphics = (size: number): QrCodeGraphicsInterface =>
	new QrCodeGraphics(size);
