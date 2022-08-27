import { CommonOrderBy, QueryConstraint, OrderBy } from '../queryConstraint'
import { MetaType } from '../../metaType'
import {
	RemoveFirstSegment,
	FindAllLevelChildKeys,
	ReplaceInvalidSegment,
	GetFirstSegment,
} from '../../utils'
import {
	ErrorOrderByChildMustStartAtGrandChildPath,
	ErrorMultipleOrderBy,
	ErrorNeedNonNumericStringKey,
} from './error'

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
		? FindAllLevelChildKeys<T, U> extends infer A extends string
			? OrderBy<
					'orderByChild',
					X extends RemoveFirstSegment<A>
						? `${U extends string
								? `${U}/`
								: ''}${GetFirstSegment<A>}/${X}` extends infer Z extends keyof T['flatten_write'] &
								string
							? ReplaceInvalidSegment<
									T,
									Z,
									X,
									`${number}`,
									ErrorNeedNonNumericStringKey
							  >
							: RemoveFirstSegment<A>
						: ErrorOrderByChildMustStartAtGrandChildPath<X, U>
			  >
			: never // impossible route
		: H
	: ErrorMultipleOrderBy
