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

declare class QC<V extends symbol> {
	private constructor()
	private symbol: V
}

export interface OrderByChild<V extends string> extends QC<OrderByChildSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'orderByChild'>
	>
	value: V
	ref: OriQueryConstraint
}

export interface OrderByKey extends QC<OrderByKeySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByKey'>
	ref: OriQueryConstraint
}

export interface OrderByValue extends QC<OrderByValueSymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByValue'>
	ref: OriQueryConstraint
}

export interface OrderByPriority extends QC<OrderByPrioritySymbol> {
	type: StrictExtract<QueryConstraintType, 'orderByPriority'>
	ref: OriQueryConstraint
}

export interface LimitToFirst extends QC<LimitToFirstSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToFirst'>
	ref: OriQueryConstraint
}

export interface LimitToLast extends QC<LimitToLastSymbol> {
	type: StrictExtract<QueryConstraintType, 'limitToLast'>
	ref: OriQueryConstraint
}

export interface StartAt<V, K extends string> extends QC<StartAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAt'>
	>
	value: V
	key: K
	ref: OriQueryConstraint
}

export interface StartAfter<V, K extends string> extends QC<StartAfterSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'startAfter'>
	>
	value: V
	key: K
	ref: OriQueryConstraint
}

export interface EndAt<V, K extends string> extends QC<EndAtSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endAt'>
	>
	value: V
	key: K
	ref: OriQueryConstraint
}

export interface EndBefore<V, K extends string> extends QC<EndBeforeSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'endBefore'>
	>
	value: V
	key: K
	ref: OriQueryConstraint
}

export interface EqualTo<V, K extends string> extends QC<EqualToSymbol> {
	type: StrictExtract<
		QueryConstraintType,
		StrictExtract<QueryConstraintType, 'equalTo'>
	>
	value: V
	key: K
	ref: OriQueryConstraint
}

export type QueryConstraint =
	| OrderByChild<string>
	| OrderByKey
	| OrderByPriority
	| OrderByValue
	| LimitToFirst
	| LimitToLast
	| StartAt<unknown, string>
	| StartAfter<unknown, string>
	| EndAt<unknown, string>
	| EndBefore<unknown, string>
	| EqualTo<unknown, string>
