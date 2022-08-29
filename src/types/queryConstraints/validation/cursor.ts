import {
	Cursor,
	OrderBy,
	CommonOrderBy,
	CommonCursor,
	Priority,
} from '../queryConstraint'
import { CursorValue } from '../cursorConstraint'
import {
	GetFirstSegment,
	FindKeyOfWriteType,
	FindNestedCompareTypeFromFullPath,
	FindAllLevelChildKeys,
} from '../../utils'
import { MetaType } from '../../metaType'
import {
	ErrorCursorMustHasOrderBy,
	ErrorMultipleOrderByCursor,
	ErrorOrderingByKeyOnlyOneArgument,
	ErrorNeedNonNumericStringKey,
	ErrorOrderingByKeyMustBeString,
	ErrorOderByPriority,
} from './error'
import { ErrorInvalidCursorValue } from '../error'

type IsValidStringKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	A extends string
> = FindKeyOfWriteType<T, U> extends infer W
	? string extends W
		? A extends `${number}`
			? ErrorNeedNonNumericStringKey
			: A
		: `${number}`
	: never // impossible route

export type ValidateCursor<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	O extends CommonOrderBy[],
	C extends CommonCursor
> = O['length'] extends 0
	? // RTDB doesn't throw error but cursors must have orderBy to works
	  ErrorCursorMustHasOrderBy
	: O['length'] extends 1
	? O[0] extends infer R
		? C extends Cursor<infer A, infer B>
			? B[] extends string[]
				? A[] extends CursorValue[]
					? IsValidStringKey<T, U, B> extends infer K extends string
						? R extends OrderBy<'orderByKey', undefined>
							? Cursor<
									A extends string
										? IsValidStringKey<T, U, A>
										: ErrorOrderingByKeyMustBeString,
									B[] extends never[] ? B : ErrorOrderingByKeyOnlyOneArgument
							  >
							: R extends OrderBy<'orderByValue', undefined>
							? Cursor<
									FindNestedCompareTypeFromFullPath<T, U> extends Record<
										string,
										infer X
									>
										? X
										: never, // impossible route
									K
							  >
							: R extends OrderBy<'orderByPriority', undefined>
							? Cursor<A extends Priority ? Priority : ErrorOderByPriority, K>
							: R extends OrderBy<'orderByChild', infer X>
							? Cursor<
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
									K
							  >
							: never // impossible route
						: never // impossible route
					: never // impossible route
				: never // impossible route
			: never // impossible route
		: never // impossible route
	: ErrorMultipleOrderByCursor
