export type QrJengaEventMap = { collapse: { removed: number } };
export type QrJengaEvents = keyof QrJengaEventMap;

export interface QrJengaInterface {
	readonly size: number;
	readonly removed: number;
	get(x: number, y: number): boolean;
	remove(x: number, y: number): boolean;

	addEventListener<T extends QrJengaEvents>(
		eventName: T,
		handler: (e: QrJengaEventMap[T]) => unknown
	): void;
}
