export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The '${T extends string ? T : 'write'}' node has no child`
export type ErrorInvalidDataTypeRead<T extends string> =
	`Error: The '${T}' node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string, object literal(or map type)`
export type ErrorInvalidDataTypeWrite<T extends string> =
	`Error: The '${T}' node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string, object literal(or map type), Increment, and ServerTimestamp`
export type ErrorInvalidDataTypeBase<T extends string> =
	`Error: The '${T}' node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string, object literal(or map type), Increment, ServerTimestamp and Push`
export type ErrorUnknownProperty<T extends string> =
	`Error: Unknown properties: '${T}'`
export type ErrorNotPushAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not push-able, only Push<T> type can be pushed. Please check the MetaType and assign Push<T> type to '${T}' node`
export type ErrorNotRemoveAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not remove-able, only Remove type can be removed. Please check the MetaType and union Remove type to '${T}' node`
