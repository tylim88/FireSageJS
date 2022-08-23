import { MetaType } from '../metaType'
import { QueryConstraintType } from '../alias'
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

declare class QueryConstraint<
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
> extends QueryConstraint<T, U, OrderByChildSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'orderByChild'>
	>
	value: V
}

export interface OrderByKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QueryConstraint<T, U, OrderByKeySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByKey'>
}

export interface OrderByValue<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QueryConstraint<T, U, OrderByValueSymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByValue'>
}

export interface OrderByPriority<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QueryConstraint<T, U, OrderByPrioritySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByPriority'>
}

export interface LimitToFirst<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QueryConstraint<T, U, LimitToFirstSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToFirst'>
}

export interface LimitToLast<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends QueryConstraint<T, U, LimitToLastSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToLast'>
}

export interface StartAt<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QueryConstraint<T, U, StartAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAt'>
	>
	value: V
}

export interface StartAfter<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QueryConstraint<T, U, StartAfterSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAfter'>
	>
	value: V
}

export interface EndAt<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QueryConstraint<T, U, EndAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endAt'>
	>
	value: V
}

export interface EndBefore<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> extends QueryConstraint<T, U, EndBeforeSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endBefore'>
	>
	value: V
}
