import type { QrJengaEventMap, QrJengaEvents, QrJengaInterface } from './interface';
import qrcode from 'qrcode';
import EventEmitter from 'events';
import jsQR from 'jsqr';
import { createQrCodeGraphics } from './graphics';

interface Mat {
	size: number;
	get(x: number, y: number): 0 | 1;
}

class QrJenga extends EventEmitter implements QrJengaInterface {
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
		super();
		if (!this._text) this._text = Math.random().toString(36).substring(2);
		const matrix: Mat = qrcode.create(this._text, {}).modules;
		this.matrix = [...Array(matrix.size)].map((_, y) =>
			[...Array(matrix.size)].map((__, x) => !!matrix.get(x, y))
		);
	}

	addEventListener<T extends QrJengaEvents>(
		eventName: T,
		handler: (e: QrJengaEventMap[T]) => unknown
	): void {
		super.on(eventName, handler);
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
		const isCollapsed = !this.validateQrCode();
		if (isCollapsed) this.dispatchEvent('collapse', { removed: this.removed });
		return !isCollapsed;
	}

	private rangeCheck(index: number) {
		if (index >= this.size) throw new RangeError('Invalid index');
	}

	private validateQrCode() {
		const { data, width, height } = this.toImageData();
		const detected = jsQR(data, width, height);
		return detected?.data === this.text;
	}

	private toImageData() {
		const blockSize = 1;
		const canvasSize = this.size * blockSize * 5;
		const qrSize = this.size * blockSize;
		const margin = Math.floor((canvasSize - qrSize) / 2);
		console.log({ blockSize, canvasSize, qrSize, margin });

		const g = createQrCodeGraphics(canvasSize);
		for (let x = 0; x < this.size; x++)
			for (let y = 0; y < this.size; y++)
				if (this.get(x, y))
					g.rect(margin + x * blockSize, margin + y * blockSize, blockSize, blockSize);

		return g.toImageData();
	}

	private dispatchEvent<T extends QrJengaEvents>(event: T, details: QrJengaEventMap[T]) {
		this.emit(event, details);
	}
}

export const createQrJenga = (text: string): QrJengaInterface => new QrJenga(text);
