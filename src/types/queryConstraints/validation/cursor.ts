import {
	Cursor,
	OrderBy,
	CommonOrderBy,
	CommonCursor,
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
			? // The 2nd argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string or optional.
			  B[] extends string[]
				? // First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.
				  A[] extends CursorValue[]
					? // Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
					  IsValidStringKey<T, U, B> extends infer K extends string
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
										: '3', // never, // impossible route
									K
							  >
							: R extends OrderBy<'orderByPriority', undefined>
							? Cursor<A, K>
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
					: Cursor<ErrorInvalidCursorValue, B>
				: Cursor<A, string>
			: never // impossible route
		: never // impossible route
	: ErrorMultipleOrderByCursor
