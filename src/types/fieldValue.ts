const serverTimestampSymbol: unique symbol = Symbol()
type ServerTimestampSymbol = typeof serverTimestampSymbol

export declare class FieldValue<T> {
	protected constructor()
	protected 'Firelord.FieldValue': T
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}
