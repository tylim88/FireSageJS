import {
	Cursor,
	OrderBy,
	CommonOrderBy,
	CommonCursor,
} from '../queryConstraint'
import { GetFirstSegment, RemoveFirstSegment } from '../../utils'
import { MetaType } from '../../metaType'
import { ErrorCursorMustHasOrderBy, ErrorMultipleOrderByCursor } from './error'

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
			? GetFirstSegment<RemoveFirstSegment<U>> extends infer K
				? R extends OrderBy<'orderByKey', undefined>
					? 1
					: R extends OrderBy<'orderByValue', undefined>
					? 1
					: R extends OrderBy<'orderByPriority', undefined>
					? 1
					: R extends OrderBy<'orderByChild', infer X>
					? R['value']
					: 2
				: never // impossible route
			: never // impossible route
		: never // impossible route
	: ErrorMultipleOrderByCursor
