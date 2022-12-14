import { TransformUndefinedToRoot } from '../utils'
export type ErrorInvalidQueryType<T extends string | undefined> =
	`Error: You can only query data type Record<string, T>, PushAble<T>, PushAbleOnly<T>, OR NumericKeyRecord<T>. But the data type of path ${TransformUndefinedToRoot<T>} is neither of those`
export type ErrorLimitInvalidNumber =
	`Error: Limit can only accept non-zero positive integer type or number`
export type ErrorInvalidCursorType =
	`Error: Invalid cursor data type, types must be one of string, number, boolean or null. `
export type ErrorQueryConstraintsMustBeTuple =
	`Error: Query Constraints must be a tuple and cannot be array.`
export type ErrorInvalidFirebaseKey =
	`Error: Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`
export type ErrorInvalidCursorValue =
	`Error: The 1st argument of startAt(), startAfter(), endAt(), endBefore(), or equalTo() can only be string, boolean, number or null.`
