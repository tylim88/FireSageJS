export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'root'}' node has no child OR 2) you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${number}' but you supply 'abc/xyz'`
export type ErrorInvalidDataType =
	`Error: This node has invalid data type and is replaced with this error message. Valid data type is null, boolean, number, string, object literal(or map type), Removable, ServerTimestamp, PushAble<T>, PushAbleOnly<T> and PseudoArray<T>.`
export type ErrorUsePseudoArrayInstead =
	`Error: This node has invalid data type and is replaced with this error message. Record<number, T> is not a valid data type, use PseudoArray<T> type instead.`
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
		: 'Root'}' data type is PushAbleOnly<T>, you cannot set or update PushAbleOnly<T> node, to add new node use 'push' instead of 'set'. You can still set or update the child nodes as long as they are not PushAbleOnly<T>. If you intend to update or set PushAbleOnly<T> node, change its type to PushAble<T>.`
export type ErrorNeedTupleNotArray =
	`Error: The type of argument is an array but require tuple, it seem like you forgot to assert it as const, eg: '[1, 2, 3] as const'.`
export type ErrorElementNeedConstAssertion =
	`Error: Two causes, either or both: 1.)This element type is string, you may forgot to assert it as const, eg: 'abc' as const; 2) You are using number, please use string numeric instead, eg: instead of 1, use '1'.`
export type ErrorNoSuchChild<
	T extends string,
	U extends string | undefined
> = `Error: ${T} is not a direct child of ${U extends string ? U : 'root'}`
export type ErrorNeedStringSegment =
	`Error: Incorrect type path, you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${string}' but your input is 'abc/${number}'`
export type ErrorObjectTypeUnion =
	`Error: This type is replaced with error message because object literal(or map type) / PushAble<T> / PushAbleOnly<T> / PseudoArray<T> cannot union with other type (except Removable). Please check your MetaType.`
export type ErrorInvalidOrNeedNumericSegment =
	`Error: Incorrect type path, possible cause: 1) incorrect path OR 2) you are trying to use non-numeric string key on numeric string key. Example: the path type is 'abc/${number}' but your input is 'abc/${string}'`
export type ErrorNeedNumericKey =
	'Error: Key must be numeric. Example: the data type is { 1: boolean} but your input is { a:boolean }'
export type ErrorPathHasAncestor<
	Descendent extends string,
	Ancestor extends string
> = `Error: values argument contains a path '${Ancestor}' that is ancestor of another path '${Descendent}'`
