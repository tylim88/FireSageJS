import { CommonOrderBy, QueryConstraint, OrderBy } from '../queryConstraint'
import { MetaType } from '../../metaType'
import {
	RemoveFirstSegment,
	FindAllLevelChildKeys,
	ReplaceInvalidSegment,
} from '../../utils'
import { ErrorInvalidOrderByChild, ErrorMultipleOrderBy } from './error'

export type GetAllOrderByType<
	QC extends QueryConstraint[],
	ACC extends CommonOrderBy[] = []
> = QC extends [infer H, ...infer R extends QueryConstraint[]]
	? GetAllOrderByType<R, [...ACC, ...(H extends CommonOrderBy ? [H] : [])]>
	: ACC

export type ValidateOrderByChildren<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	O extends CommonOrderBy[],
	H extends CommonOrderBy
	// Error: You can't combine multiple orderBy calls.
> = O['length'] extends 0 | 1
	? H extends OrderBy<'orderByChild', infer X>
		? X extends RemoveFirstSegment<FindAllLevelChildKeys<T, U>>
			? OrderBy<
					'orderByChild',
					ReplaceInvalidSegment<T, X & keyof T['flatten_write'] & string>
			  >
			: OrderBy<'orderByChild', ErrorInvalidOrderByChild<X, U>>
		: H
	: ErrorMultipleOrderBy
