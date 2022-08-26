import {
	Cursor,
	OrderBy,
	CommonOrderBy,
	CommonCursor,
} from '../queryConstraint'
import {
	GetFirstSegment,
	RemoveFirstSegment,
	FindKeyOfWriteType,
	FindNestedReadTypeFromFullPath,
	FindAllLevelChildKeys,
} from '../../utils'
import { MetaType } from '../../metaType'
import {
	ErrorCursorMustHasOrderBy,
	ErrorMultipleOrderByCursor,
	ErrorOrderingByKeyOnlyOneArgument,
	ErrorOrderByNeedNonNumericStringKey,
	ErrorKeyMustBeString,
} from './error'

type IsValidStringKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	A
> = FindKeyOfWriteType<T, U> extends infer W
	? A extends string
		? string extends W
			? A extends `${number}`
				? ErrorOrderByNeedNonNumericStringKey
				: A
			: `${number}`
		: ErrorKeyMustBeString
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
			? IsValidStringKey<T, U, A> extends infer K extends string
				? R extends OrderBy<'orderByKey', undefined>
					? Cursor<
							K,
							B[] extends never[] ? B : ErrorOrderingByKeyOnlyOneArgument
					  >
					: R extends OrderBy<'orderByValue', undefined>
					? Cursor<
							FindNestedReadTypeFromFullPath<T, U> extends Record<
								string,
								infer X
							>
								? X
								: never, // impossible route
							K
					  >
					: R extends OrderBy<'orderByPriority', undefined>
					? Cursor<A, K>
					: R extends OrderBy<'orderByChild', infer X>
					? Cursor<
							FindNestedReadTypeFromFullPath<
								T,
								`${U extends string ? `${U}/` : ''}${GetFirstSegment<
									FindAllLevelChildKeys<T, U>
								>}/${R['value']}`
							>,
							K
					  >
					: never // impossible route
				: never // impossible route
			: never // impossible route
		: never // impossible route
	: ErrorMultipleOrderByCursor

export type a = 1
