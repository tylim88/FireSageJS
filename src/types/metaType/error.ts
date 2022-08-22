export type ErrorInvalidDataType =
	`Error: This node has invalid data type and is replaced with this error message. Valid data type is null, boolean, number, string, object literal(or map type), Removable, ServerTimestamp, PushAble<T>, PushAbleOnly<T> and PseudoArray<T>.`
export type ErrorUsePseudoArrayInstead =
	`Error: This node has invalid data type and is replaced with this error message. Record<number, T> is not a valid data type, use PseudoArray<T> type instead.`
export type ErrorObjectTypeUnion =
	`Error: This type is replaced with error message because object literal(or map type) / PushAble<T> / PushAbleOnly<T> / PseudoArray<T> cannot union with other type (except Removable). Please check your MetaType.`
