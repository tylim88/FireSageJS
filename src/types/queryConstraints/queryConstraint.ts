import { MetaType } from '../metaType'
import { QueryConstraintType, OriQueryConstraint } from '../alias'
import { StrictExtract } from '../utils'

const orderByChildSymbol: unique symbol = Symbol()
const orderByKeySymbol: unique symbol = Symbol()
const orderByValueSymbol: unique symbol = Symbol()
const orderByPrioritySymbol: unique symbol = Symbol()
const limitToFirstSymbol: unique symbol = Symbol()
const limitToLastSymbol: unique symbol = Symbol()
const startAtSymbol: unique symbol = Symbol()
const startAfterSymbol: unique symbol = Symbol()
const endAtSymbol: unique symbol = Symbol()
const endBeforeSymbol: unique symbol = Symbol()
const equalToSymbol: unique symbol = Symbol()

type OrderByChildSymbol = typeof orderByChildSymbol
type OrderByKeySymbol = typeof orderByKeySymbol
type OrderByValueSymbol = typeof orderByValueSymbol
type OrderByPrioritySymbol = typeof orderByPrioritySymbol
type LimitToFirstSymbol = typeof limitToFirstSymbol
type LimitToLastSymbol = typeof limitToLastSymbol
type StartAtSymbol = typeof startAtSymbol
type StartAfterSymbol = typeof startAfterSymbol
type EndAtSymbol = typeof endAtSymbol
type EndBeforeSymbol = typeof endBeforeSymbol
type EqualToSymbol = typeof equalToSymbol

declare class QC<
	T extends MetaType,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends symbol
> {
	private constructor()
	private symbol: V
}

export interface OrderByChild<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends string
> extends QC<T, U, OrderByChildSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'orderByChild'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface OrderByKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QC<T, U, OrderByKeySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByKey'>
	ref: OriQueryConstraint
}

export interface OrderByValue<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QC<T, U, OrderByValueSymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByValue'>
	ref: OriQueryConstraint
}

export interface OrderByPriority<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QC<T, U, OrderByPrioritySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByPriority'>
	ref: OriQueryConstraint
}

export interface LimitToFirst<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QC<T, U, LimitToFirstSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToFirst'>
	ref: OriQueryConstraint
}

export interface LimitToLast<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QC<T, U, LimitToLastSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToLast'>
	ref: OriQueryConstraint
}

export interface StartAt<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QC<T, U, StartAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAt'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface StartAfter<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QC<T, U, StartAfterSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAfter'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface EndAt<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QC<T, U, EndAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endAt'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface EndBefore<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QC<T, U, EndBeforeSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endBefore'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface EqualTo<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QC<T, U, EqualToSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'equalTo'>
	>
	value: V
	ref: OriQueryConstraint
}

export type QueryConstraint<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> =
	| OrderByChild<T, U, string>
	| OrderByKey<T, U>
	| OrderByPriority<T, U>
	| OrderByValue<T, U>
	| LimitToFirst<T, U>
	| LimitToLast<T, U>
	| StartAt<T, U, unknown>
	| StartAfter<T, U, unknown>
	| EndAt<T, U, unknown>
	| EndBefore<T, U, unknown>
	| EqualTo<T, U, unknown>
