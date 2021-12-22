export type QrCodeJengaEventMap = { collapse: never; remove: [number, number] };
export type QrCodeJengaEvents = keyof QrCodeJengaEventMap;

export class QrCodeJengaEvent<T extends keyof QrCodeJengaEventMap> extends CustomEvent<
	QrCodeJengaEventMap[T]
> {
	constructor(type: T, eventInitDict: CustomEventInit<QrCodeJengaEventMap[T]>) {
		super(type, eventInitDict);
	}
}
export interface QrCodeJengaInterface {
	readonly size: number;
	readonly removed: number;
	get(x: number, y: number): boolean;
	remove(x: number, y: number): QrCodeJengaInterface;

	addEventListener<T extends QrCodeJengaEvents>(
		eventName: T,
		handler: (e: QrCodeJengaEvent<T>) => unknown
	): void;
}
