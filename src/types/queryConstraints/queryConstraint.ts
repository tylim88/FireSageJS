import { QueryConstraintType, OriQueryConstraint } from '../alias'
import { StrictExtract } from '../utils'

const orderBySymbol: unique symbol = Symbol()
const limitSymbol: unique symbol = Symbol()
const cursorSymbol: unique symbol = Symbol()

type OrderBySymbol = typeof orderBySymbol
type LimitSymbol = typeof limitSymbol
type CursorSymbol = typeof cursorSymbol

declare class Constraint<V extends symbol> {
	private constructor()
	private symbol: V
}

type OrderByType = StrictExtract<
	QueryConstraintType,
	StrictExtract<
		QueryConstraintType,
		'orderByChild' | 'orderByKey' | 'orderByValue' | 'orderByPriority'
	>
>

export interface OrderBy<
	T extends OrderByType,
	V extends T extends 'orderByChild' ? string : undefined
> extends Constraint<OrderBySymbol> {
	type: T
	value: V
	ref: OriQueryConstraint
}

export interface Limit extends Constraint<LimitSymbol> {
	ref: OriQueryConstraint
}

export interface Cursor<V, K extends string> extends Constraint<CursorSymbol> {
	value: V
	key: K
	ref: OriQueryConstraint
}

export type CommonOrderBy =
	| OrderBy<'orderByChild', string>
	| OrderBy<'orderByKey' | 'orderByValue' | 'orderByPriority', undefined>

export type CommonCursor = Cursor<unknown, string>

export type QueryConstraint = Limit | CommonCursor | CommonOrderBy
