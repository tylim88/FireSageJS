const serverTimestampSymbol: unique symbol = Symbol()
const incrementSymbol: unique symbol = Symbol()
const pushAbleSymbol: unique symbol = Symbol()
const pushAbleOnlySymbol: unique symbol = Symbol()
const removeSymbol: unique symbol = Symbol()
const numericKeyRecord: unique symbol = Symbol()

type ServerTimestampSymbol = typeof serverTimestampSymbol
type IncrementSymbol = typeof incrementSymbol
type PushAbleSymbol = typeof pushAbleSymbol
type PushAbleOnlySymbol = typeof pushAbleOnlySymbol
type RemoveSymbol = typeof removeSymbol
type NumericKeyRecordSymbol = typeof numericKeyRecord

declare class FieldType<T extends symbol> {
	private constructor()
	// private symbol: T // ! this will get translated to "private symbol" only and it breaks the code, use protected instead!
	protected symbol: T
}

export interface ServerTimestamp extends FieldType<ServerTimestampSymbol> {}

export interface Increment extends FieldType<IncrementSymbol> {}

export interface Removable extends FieldType<RemoveSymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PushAble<T> extends FieldType<PushAbleSymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PushAbleOnly<T> extends FieldType<PushAbleOnlySymbol> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface NumericKeyRecord<T>
	extends FieldType<NumericKeyRecordSymbol> {}

export type AllFieldTypes =
	| ServerTimestamp
	| Increment
	| Removable
	| PushAble<unknown>
	| PushAbleOnly<unknown>
	| NumericKeyRecord<unknown>
