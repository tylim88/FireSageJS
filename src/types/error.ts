import { RemoveLastSegment } from './stringManipulation'

export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The '${T extends string ? T : 'root'}' node has no child`
export type ErrorInvalidDataType =
	`Error: This node has invalid data type and is replaced with this error message. Valid data type is null, boolean, number, string, object literal(or map type), Removable, ServerTimestamp, PushAble<T>, PushAbleOnly<T> and PseudoArray<T>.`
export type ErrorUnknownProperty<T extends string> =
	`Error: Unknown properties: '${T}'`
export type ErrorNotPushAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not push-able, only PushAble<T> or PushAbleOnly<T> type can be pushed. Please check the MetaType and assign Push<T> or PushAbleOnly<T> type to '${T}' node`
export type ErrorNotRemoveAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not removable, only Removable type can be removed. Please check the MetaType and union Removable type to '${T}' node`
export type ErrorIsPushOnlyAbleType<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node type is PushAbleOnly<T>, you cannot set or update PushAbleOnly<T> node, to add new node use 'push'. You can still set or update the child nodes as long as they are not PushAbleOnly<T>`
export type ErrorNeedTupleNotArray =
	`Error: The type of argument is an array but require tuple, it seem like you forgot to assert it as const, eg: "[1, 2, 3] as const".`
export type ErrorElementNeedConstAssertion =
	`Error: This element type is string, you may forgot to assert it as const, eg: 'abc' as const`
export type ErrorNoSuchChild<
	T extends string,
	U extends string | undefined
> = `Error: ${T} is not a direct child of ${U extends string ? U : 'root'}`
export type ErrorNeedString =
	`Error: Incorrect type path, you are trying to use non-numeric string key on numeric string key. Example: the path type is a/${string} but you supply a/123`
export type ErrorObjectTypeUnion =
	`Error: This type is replaced with error message because object literal(or map type) / PushAble<T> / PushAbleOnly<T> / PseudoArray<T> cannot union with other type (except Removable). Please check your MetaType.`
export type ErrorInvalidPathTypeOrNeedNumber =
	`Error: Incorrect type path, possible cause: incorrect key or you are trying to use numeric string key on non-numeric string key. Example: the path type is a/${number} but you supply a/xyz`
export type ErrorInvalidPathType =
	`Error: Incorrect type path, possible cause: incorrect key OR you are trying to use numeric string key on non-numeric string key. Example: the path type is a/${number} but you supply a/xyz`
