export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'root'}' node has no child OR 2) you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${number}' but you supply 'abc/xyz'`
export type ErrorNotPushAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not push-able, only PushAble<T> or PushAbleOnly<T> type can be pushed. Please check the MetaType and assign Push<T> or PushAbleOnly<T> type to '${T}' node`
export type ErrorNotRemoveAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not removable, only Removable type can be removed. Please check the MetaType and union Removable type to '${T}' node`
export type ErrorNeedStringSegment =
	`Error: Incorrect path type, you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${string}' but your input is 'abc/${number}'`
export type ErrorInvalidOrNeedNumericSegment =
	`Error: Incorrect path type, possible cause: 1) incorrect path OR 2) you are trying to use non-numeric string key on numeric string key. Example: the path type is 'abc/${number}' but your input is 'abc/${string}'`
export type ErrorNeedNumericKey =
	'Error: Key must be numeric. Example: the data type is { 1: boolean} but your input is { a:boolean }'
