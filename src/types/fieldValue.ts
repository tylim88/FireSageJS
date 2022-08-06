const serverTimestampSymbol: unique symbol = Symbol()
type ServerTimestampSymbol = typeof serverTimestampSymbol
const incrementSymbol: unique symbol = Symbol()
type IncrementSymbol = typeof incrementSymbol
const pushAbleSymbol: unique symbol = Symbol()
type PushAbleSymbol = typeof pushAbleSymbol
const pushAbleOnlySymbol: unique symbol = Symbol()
type PushAbleOnlySymbol = typeof pushAbleOnlySymbol
const removeSymbol: unique symbol = Symbol()
type RemoveSymbol = typeof removeSymbol

declare class FieldValue<T extends symbol> {
	protected constructor()
	protected 'FireSage.FieldValue': T
}

export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}

export interface Removable extends FieldValue<RemoveSymbol> {}

export interface PushAble<T> extends FieldValue<PushAbleSymbol> {}

export interface PushAbleOnly<T> extends FieldValue<PushAbleOnlySymbol> {}
