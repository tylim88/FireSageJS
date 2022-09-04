import {
	AllOrderByConstraints,
	AllQueryConstraints,
	OrderByConstraint,
} from '../queryConstraint'
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

export type GetAllOrderByConstraints<
	QC extends AllQueryConstraints[],
	ACC extends AllOrderByConstraints[] = []
> = QC extends [infer H, ...infer R extends AllQueryConstraints[]]
	? GetAllOrderByConstraints<
			R,
			[...ACC, ...(H extends AllOrderByConstraints ? [H] : [])]
	  >
	: ACC

export type ValidateOrderByChildren<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	O extends AllOrderByConstraints[],
	H extends AllOrderByConstraints
	// Error: You can't combine multiple orderBy calls.
> = O['length'] extends 0 | 1
	? H extends OrderByConstraint<'orderByChild', infer X>
		? FindAllLevelChildKeys<T, U> extends infer A extends string
			? OrderByConstraint<
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
