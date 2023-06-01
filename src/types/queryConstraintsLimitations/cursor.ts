import {
	CursorConstraint,
	OrderByConstraint,
	AllOrderByConstraints,
	AllCursorConstraints,
	AllQueryConstraints,
	Priority,
	CursorTypes,
	CursorValue,
	ErrorInvalidCursorValue,
	ErrorInvalidFirebaseKey,
} from '../queryConstraints'
import {
	FindNestedCompareTypeFromFullPath,
	FindAllLevelChildKeys,
	ValidateChildPath,
} from '../utils'
import { GetFirstSegment } from '../tsUtils'
import { MetaType } from '../metaType'
import {
	ErrorCursorMustHasOrderBy,
	ErrorMultipleOrderByCursor,
	ErrorOrderingByKeyOnlyOneArgument,
	ErrorOrderingByKeyMustBeString,
	ErrorOderByPriority,
	ErrorNeedStringKeyCursor,
	ErrorNeedNumericKeyCursor,
	ErrorCursorMustBeUnique,
	ErrorCannotUseStartAtStartAfterTogether,
	ErrorCannotUseEndAtEndBeforeTogether,
	ErrorEqualToMustBeTheOnlyCursor,
} from './error'

type ValidateChildPathCursor<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	A extends string
> = ValidateChildPath<
	T,
	U,
	A,
	ErrorNeedNumericKeyCursor,
	ErrorNeedStringKeyCursor,
	ErrorInvalidFirebaseKey
>

export type GetAllCursorConstraints<
	QC extends AllQueryConstraints[],
	ACC extends AllCursorConstraints[] = []
> = QC extends [infer H, ...infer R extends AllQueryConstraints[]]
	? GetAllCursorConstraints<
			R,
			[...ACC, ...(H extends AllCursorConstraints ? [H] : [])]
	  >
	: ACC

export type GetAllCursorTypes<
	CC extends AllCursorConstraints[],
	ACC extends CursorTypes[] = []
> = CC extends [infer H, ...infer R extends AllCursorConstraints[]]
	? GetAllCursorTypes<
			R,
			[...ACC, H extends CursorConstraint<infer T, unknown, string> ? T : never]
	  >
	: ACC

export type IsStartOrEndUnique<
	AllCursorTypes extends CursorTypes[],
	Pass
> = AllCursorTypes extends [
	infer H extends CursorTypes,
	...infer R extends CursorTypes[]
]
	? R extends (infer A)[]
		? H extends A
			? ErrorCursorMustBeUnique<H>
			: H extends 'startAt'
			? 'startAfter' extends A
				? ErrorCannotUseStartAtStartAfterTogether
				: IsStartOrEndUnique<R, Pass>
			: H extends 'startAfter'
			? 'startAt' extends A
				? ErrorCannotUseStartAtStartAfterTogether
				: IsStartOrEndUnique<R, Pass>
			: H extends 'endAt'
			? 'endBefore' extends A
				? ErrorCannotUseEndAtEndBeforeTogether
				: IsStartOrEndUnique<R, Pass>
			: H extends 'endBefore'
			? 'endAt' extends A
				? ErrorCannotUseEndAtEndBeforeTogether
				: IsStartOrEndUnique<R, Pass>
			: IsStartOrEndUnique<R, Pass>
		: never // impossible route
	: Pass

export type ValidateCursorUniqueness<
	AllCursorTypes extends CursorTypes[],
	Pass
> = AllCursorTypes extends (infer A)[]
	? 'equalTo' extends A
		? AllCursorTypes['length'] extends 1
			? IsStartOrEndUnique<AllCursorTypes, Pass>
			: ErrorEqualToMustBeTheOnlyCursor
		: IsStartOrEndUnique<AllCursorTypes, Pass>
	: never // impossible route

export type ValidateCursor<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	AllOrderBy extends AllOrderByConstraints[],
	CurrentCursor extends AllCursorConstraints,
	AllCursor extends AllCursorConstraints[]
> = ValidateCursorUniqueness<
	GetAllCursorTypes<AllCursor>,
	AllOrderBy['length'] extends 0
		? // RTDB doesn't throw error but cursors must have orderBy to works
		  ErrorCursorMustHasOrderBy
		: AllOrderBy['length'] extends 1
		? AllOrderBy[0] extends infer R
			? CurrentCursor extends CursorConstraint<infer Z, infer A, infer B>
				? B[] extends string[]
					? A[] extends CursorValue[]
						? R extends OrderByConstraint<'orderByKey', undefined>
							? CursorConstraint<
									Z,
									A extends string
										? ValidateChildPathCursor<T, U, A>
										: ErrorOrderingByKeyMustBeString,
									B[] extends never[] ? B : ErrorOrderingByKeyOnlyOneArgument
							  >
							: R extends OrderByConstraint<'orderByValue', undefined>
							? CursorConstraint<
									Z,
									FindNestedCompareTypeFromFullPath<T, U> extends Record<
										string,
										infer X
									>
										? X
										: never, // impossible route
									ValidateChildPathCursor<T, U, B>
							  >
							: R extends OrderByConstraint<'orderByPriority', undefined>
							? CursorConstraint<
									Z,
									A extends Priority ? Priority : ErrorOderByPriority,
									ValidateChildPathCursor<T, U, B>
							  >
							: R extends OrderByConstraint<'orderByChild', infer X>
							? CursorConstraint<
									Z,
									FindNestedCompareTypeFromFullPath<
										T,
										`${U extends string ? `${U}/` : ''}${GetFirstSegment<
											FindAllLevelChildKeys<T, U>
										>}/${X}`
									> extends infer S
										? Exclude<S, CursorValue> extends never
											? S
											: ErrorInvalidCursorValue
										: never, // impossible route,
									ValidateChildPathCursor<T, U, B>
							  >
							: never // impossible route
						: never // impossible route
					: never // impossible route
				: never // impossible route
			: never // impossible route
		: ErrorMultipleOrderByCursor
>
