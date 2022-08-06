const serverTimestampSymbol: unique symbol = Symbol()
type ServerTimestampSymbol = typeof serverTimestampSymbol
const incrementSymbol: unique symbol = Symbol()
type IncrementSymbol = typeof incrementSymbol
const pushSymbol: unique symbol = Symbol()
type PushSymbol = typeof pushSymbol
const removeSymbol: unique symbol = Symbol()
type RemoveSymbol = typeof removeSymbol

declare class FieldValue<T extends symbol> {
	protected constructor()
	protected 'FireSage.FieldValue': T
}
interface PushValue<T> {
	'FireSage.PushValue': T
}
export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}

export interface Remove extends FieldValue<RemoveSymbol> {}

export interface Push<T> extends FieldValue<PushSymbol>, PushValue<T> {}
