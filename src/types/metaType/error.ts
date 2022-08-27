export type ErrorInvalidDataType =
	`Error: This node has invalid data type and is replaced with this error message. Valid data type is null, boolean, number, string, object literal(or map type), Record<string, T>, Removable, ServerTimestamp, PushAble<T>, PushAbleOnly<T> or PseudoArray<T>.`
export type ErrorUsePseudoArrayInstead =
	`Error: This node has invalid data type and is replaced with this error message. Record<number, T> is not a valid data type, use PseudoArray<T> type instead.`
export type ErrorObjectTypeUnion =
	`Error: This type is replaced with error message because object literal(or map type), Record<string, T>, PushAble<T>, PushAbleOnly<T> or PseudoArray<T> cannot union with other type (except Removable). Please check your MetaType.`
export type ErrorInvalidKey<T extends string> =
	`Error: This type is replaced with  error message because Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]" but ${T} has one. Please check your MetaType`
