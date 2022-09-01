import { CommonOrderBy, QueryConstraint, OrderBy } from '../queryConstraint'
import { MetaType } from '../../metaType'
import {
	FindAllLevelChildKeys,
	ValidateFullPath,
	FindNestedCompareTypeFromFullPath,
} from '../../utils'
import { RemoveFirstSegment, GetFirstSegment } from '../../tsUtils'
import {
	ErrorOrderByChildMustStartAtGrandChildPath,
	ErrorMultipleOrderBy,
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
					FindNestedCompareTypeFromFullPath<T, U> extends Record<
						string,
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						infer L extends Record<string, unknown>
					>
						? `${U extends string
								? `${U}/`
								: ''}${GetFirstSegment<A>}/${X}` extends infer Z extends keyof T['flatten_write'] &
								string
							? ValidateFullPath<T, Z, X>
							: RemoveFirstSegment<A>
						: ErrorOrderByChildMustStartAtGrandChildPath<X, U>
			  >
			: never // impossible route
		: H
	: ErrorMultipleOrderBy
