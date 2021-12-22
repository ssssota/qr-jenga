export type QrCodeJengaEventMap = { collapse: { removed: number } };
export type QrCodeJengaEvents = keyof QrCodeJengaEventMap;

export interface QrCodeJengaInterface {
	readonly size: number;
	readonly removed: number;
	get(x: number, y: number): boolean;
	remove(x: number, y: number): boolean;

	addEventListener<T extends QrCodeJengaEvents>(
		eventName: T,
		handler: (e: QrCodeJengaEventMap[T]) => unknown
	): void;
}
