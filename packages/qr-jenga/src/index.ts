import type { QrGraphicsInterface, QrJengaInterface } from './interface';
import qrcode from 'qrcode';
import jsQR from 'jsqr';

interface Mat {
	size: number;
	get(x: number, y: number): 0 | 1;
}

type RGBA = [number, number, number, number];

class QrGraphics implements QrGraphicsInterface {
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

const createQrGraphics = (size: number): QrGraphicsInterface => new QrGraphics(size);

class QrJenga implements QrJengaInterface {
	private matrix: boolean[][];
	private _removed = 0;
	get text() {
		return this._text;
	}
	get size() {
		return this.matrix.length;
	}
	get removed() {
		return this._removed;
	}

	constructor(private _text: string) {
		if (!this._text) this._text = Math.random().toString(36).substring(2);
		const matrix: Mat = qrcode.create(this._text, {}).modules;
		this.matrix = [...Array(matrix.size)].map((_, y) =>
			[...Array(matrix.size)].map((__, x) => !!matrix.get(x, y))
		);
	}

	get(x: number, y: number) {
		this.rangeCheck(x);
		this.rangeCheck(y);
		return this.matrix[y][x];
	}

	remove(x: number, y: number) {
		if (!this.get(x, y)) throw new Error('Not able to remove black area');
		this._removed++;
		this.matrix[y][x] = false;
		const isCollapsed = !this.validateQr();
		return !isCollapsed;
	}

	private rangeCheck(index: number) {
		if (index >= this.size) throw new RangeError('Invalid index');
	}

	private validateQr() {
		const { data, width, height } = this.toImageData();
		const detected = jsQR(data, width, height);
		return detected?.data === this.text;
	}

	private toImageData() {
		const blockSize = 1;
		const canvasSize = this.size * blockSize * 5;
		const qrSize = this.size * blockSize;
		const margin = Math.floor((canvasSize - qrSize) / 2);

		const g = createQrGraphics(canvasSize);
		for (let x = 0; x < this.size; x++)
			for (let y = 0; y < this.size; y++)
				if (this.get(x, y))
					g.rect(margin + x * blockSize, margin + y * blockSize, blockSize, blockSize);

		return g.toImageData();
	}
}

export { QrJengaInterface };
export const createQrJenga = (text: string): QrJengaInterface => new QrJenga(text);
