export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The '${T extends string ? T : 'write'}' node has no child`
export type ErrorInvalidDataType<T extends string> =
	`Error: The '${T}' node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string and object literal`
export type ErrorUnknownProperty<T extends string> =
	`Error: Unknown properties: '${T}'`
export type ErrorNotPushAble<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' node is not push-able, only Push type can be pushed. Please check the MetaType and assign Push type to '${T}' node`
