import {
	CursorConstraint,
	OrderByConstraint,
	AllOrderByConstraints,
	AllCursorConstraints,
	Priority,
} from '../queryConstraint'
import { CursorValue } from '../cursorConstraint'
import {
	FindNestedCompareTypeFromFullPath,
	FindAllLevelChildKeys,
	ValidateChildPath,
} from '../../utils'
import { GetFirstSegment } from '../../tsUtils'
import { MetaType } from '../../metaType'
import {
	ErrorCursorMustHasOrderBy,
	ErrorMultipleOrderByCursor,
	ErrorOrderingByKeyOnlyOneArgument,
	ErrorOrderingByKeyMustBeString,
	ErrorOderByPriority,
	ErrorNeedStringKeyCursor,
	ErrorNeedNumericKeyCursor,
} from './error'
import { ErrorInvalidCursorValue, ErrorInvalidFirebaseKey } from '../error'

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

export type IsCursorConflicting = 1

export type ValidateCursor<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	O extends AllOrderByConstraints[],
	C extends AllCursorConstraints
> = O['length'] extends 0
	? // RTDB doesn't throw error but cursors must have orderBy to works
	  ErrorCursorMustHasOrderBy
	: O['length'] extends 1
	? O[0] extends infer R
		? C extends CursorConstraint<infer Z, infer A, infer B>
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
