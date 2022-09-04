export type ErrorInvalidDataType =
	`Error: This node has invalid data type and is replaced with this error message. Valid data type is null, boolean, number, string, object declared with Type not Interface, Record<string, T>, Removable, ServerTimestamp, PushAble<T>, PushAbleOnly<T> or NumericKeyRecord<T>.`
export type ErrorUseNumericKeyRecordInstead =
	`Error: This node has invalid data type and is replaced with this error message. Record<number, T> or Record<${'`${number}`'}, T> are not valid data types, use NumericKeyRecord<T> type instead.`
export type ErrorObjectTypeUnion =
	`Error: This type is replaced with error message because non-primitive type cannot union with other type (except Removable). Please check your MetaType.`
export type ErrorInvalidKey<T extends string> =
	`Error: This type is replaced with  error message because Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]" but ${T} has one. Please check your MetaType`
