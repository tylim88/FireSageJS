const serverTimestampSymbol: unique symbol = Symbol()
type ServerTimestampSymbol = typeof serverTimestampSymbol
const incrementSymbol: unique symbol = Symbol()
type IncrementSymbol = typeof incrementSymbol

export declare class FieldValue<T> {
	protected constructor()
	protected 'Firelord.FieldValue': T
}

export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}
