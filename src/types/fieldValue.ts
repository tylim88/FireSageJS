declare const serverTimestampSymbol: unique symbol
declare const incrementSymbol: unique symbol
declare const pushAbleSymbol: unique symbol
declare const pushAbleOnlySymbol: unique symbol
declare const removeSymbol: unique symbol
declare const numericKeyRecordSymbol: unique symbol
declare const possiblyReadAsNullableSymbol: unique symbol

type ServerTimestampSymbol = typeof serverTimestampSymbol
type IncrementSymbol = typeof incrementSymbol
type PushAbleSymbol = typeof pushAbleSymbol
type PushAbleOnlySymbol = typeof pushAbleOnlySymbol
type RemoveSymbol = typeof removeSymbol
type NumericKeyRecordSymbol = typeof numericKeyRecordSymbol
type PossiblyReadAsNullableSymbol = typeof possiblyReadAsNullableSymbol

declare class FieldValue<T extends symbol> {
	private constructor()
	// private symbol: T // ! this will get translated to "private symbol" only and it breaks the code, use protected instead!
	protected symbol: T
}

export interface ServerTimestamp extends FieldValue<ServerTimestampSymbol> {}

export interface Increment extends FieldValue<IncrementSymbol> {}

export interface Removable extends FieldValue<RemoveSymbol> {}

export interface PushAble<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	T
> extends FieldValue<PushAbleSymbol> {}

export interface PushAbleOnly<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	T
> extends FieldValue<PushAbleOnlySymbol> {}
export interface NumericKeyRecord<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	T
> extends FieldValue<NumericKeyRecordSymbol> {}

export interface PossiblyReadAsNullable
	extends FieldValue<PossiblyReadAsNullableSymbol> {}

export type AllFieldTypes =
	| ServerTimestamp
	| Increment
	| Removable
	| PushAble<unknown>
	| PushAbleOnly<unknown>
	| NumericKeyRecord<unknown>
	| PossiblyReadAsNullable
