const serverTimestampSymbol: unique symbol = Symbol()
const incrementSymbol: unique symbol = Symbol()
const pushAbleSymbol: unique symbol = Symbol()
const pushAbleOnlySymbol: unique symbol = Symbol()
const removeSymbol: unique symbol = Symbol()
const pseudoArray: unique symbol = Symbol()

type ServerTimestampSymbol = typeof serverTimestampSymbol
type IncrementSymbol = typeof incrementSymbol
type PushAbleSymbol = typeof pushAbleSymbol
type PushAbleOnlySymbol = typeof pushAbleOnlySymbol
type RemoveSymbol = typeof removeSymbol
type PseudoArraySymbol = typeof pseudoArray

declare class FieldValue<T extends symbol> {
	protected constructor()
	protected 'FireSage.FieldValue': T
}

export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}

export interface Removable extends FieldValue<RemoveSymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PushAble<T> extends FieldValue<PushAbleSymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PushAbleOnly<T> extends FieldValue<PushAbleOnlySymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PseudoArray<T> extends FieldValue<PseudoArraySymbol> {}
