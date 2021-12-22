import { createQrJenga } from '../src';

describe('crateQrJenga', () => {
	it('should return correct size', () => {
		const qrJenga = createQrJenga('test');
		expect(qrJenga.size).toBe(21);
	});
	it('should return black ((0,0) always black)', () => {
		const qrJenga = createQrJenga('test');
		expect(qrJenga.get(0, 0)).toBe(true);
	});
	it('should remove black and return valid (success)', () => {
		const qrJenga = createQrJenga('test');
		expect(qrJenga.remove(0, 0)).toBe(true);
		expect(qrJenga.get(0, 0)).toBe(false);
	});
	it('should remove black and return valid (failed)', () => {
		const qrJenga = createQrJenga('test');
		expect(qrJenga.remove(3, 3)).toBe(false);
		expect(qrJenga.get(3, 3)).toBe(false);
	});
	it('should throw error (white cant remove)', () => {
		const qrJenga = createQrJenga('test');
		expect(() => qrJenga.remove(1, 1)).toThrowError('Not able to remove black area');
	});
	it('should return correct remove count', () => {
		const qrJenga = createQrJenga('test');
		expect(qrJenga.removed).toBe(0);
		qrJenga.remove(0, 0);
		expect(qrJenga.removed).toBe(1);
		qrJenga.remove(1, 0);
		expect(qrJenga.removed).toBe(2);
		qrJenga.remove(2, 0);
		expect(qrJenga.removed).toBe(3);
		qrJenga.remove(3, 0);
		expect(qrJenga.removed).toBe(4);
	});
});
