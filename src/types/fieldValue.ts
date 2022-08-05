const serverTimestampSymbol: unique symbol = Symbol()
type ServerTimestampSymbol = typeof serverTimestampSymbol
const incrementSymbol: unique symbol = Symbol()
type IncrementSymbol = typeof incrementSymbol
const pushSymbol: unique symbol = Symbol()
type PushSymbol = typeof pushSymbol
export declare class FieldValue<T> {
	protected constructor()
	protected 'FireSage.FieldValue': T
}
interface PushValue<T> {
	'FireSage.PushValue': T
}
export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}

export interface Push<T> extends FieldValue<PushSymbol>, PushValue<T> {}
