import { QueryConstraintType, OriQueryConstraint } from '../alias'
import { StrictExtract } from '../tsUtils'

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

export interface OrderByConstraint<
	T extends OrderByType,
	V extends T extends 'orderByChild' ? string : undefined
> extends Constraint<OrderBySymbol> {
	type: T
	value: V
	ref: OriQueryConstraint
}

export interface LimitConstraint extends Constraint<LimitSymbol> {
	ref: OriQueryConstraint
}

export interface CursorConstraint<V, K extends string>
	extends Constraint<CursorSymbol> {
	value: V
	key: K
	ref: OriQueryConstraint
}

export type AllOrderByConstraints =
	| OrderByConstraint<'orderByChild', string>
	| OrderByConstraint<
			'orderByKey' | 'orderByValue' | 'orderByPriority',
			undefined
	  >

export type AllCursorConstraints = CursorConstraint<unknown, string>

export type AllQueryConstraints =
	| LimitConstraint
	| AllCursorConstraints
	| AllOrderByConstraints

export type Priority = string | number | null
