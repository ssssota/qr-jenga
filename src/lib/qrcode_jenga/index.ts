import type { QrCodeJengaEvent, QrCodeJengaEvents, QrCodeJengaInterface } from './interface';
import qrcode from 'qrcode';
import EventEmitter from 'events';
import jsQR from 'jsqr';

interface Mat {
	size: number;
	get(x: number, y: number): 0 | 1;
}

class QrCodeJenga extends EventEmitter implements QrCodeJengaInterface {
	private static readonly imageScale = 2;
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

	addEventListener<T extends QrCodeJengaEvents>(
		eventName: T,
		handler: (e: QrCodeJengaEvent<T>) => unknown
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
		if (!this.validateQrCode()) this.emit('collapse');
		return this;
	}

	private rangeCheck(index: number) {
		if (index >= this.size) throw new RangeError('Invalid index');
	}

	private validateQrCode() {
		const detected = jsQR(
			this.toImageBuffer(),
			this.size * QrCodeJenga.imageScale,
			this.size * QrCodeJenga.imageScale
		);
		return detected?.data === this.text;
	}

	private toImageBuffer() {
		const arr = this.matrix.flatMap((line) => {
			const l = line
				.map<[number, number, number, number]>((block) =>
					block ? [0x00, 0x00, 0x00, 0xff] : [0xff, 0xff, 0xff, 0xff]
				)
				.flatMap((block) => [...Array(QrCodeJenga.imageScale)].flatMap(() => [...block]));
			return [...Array(QrCodeJenga.imageScale)].flatMap(() => [...l]);
		});
		return new Uint8ClampedArray(arr);
	}
}

export const createQrCodeJenga = (text: string): QrCodeJengaInterface => new QrCodeJenga(text);
