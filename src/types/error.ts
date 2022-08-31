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
