export type ErrorHasNoChild<T extends string | undefined> =
	`Error: The "${T extends string ? T : 'root'}" node has no child`
export type ErrorInvalidDataType<T extends string> =
	`Error: The ${T} node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string and object literal`
export type ErrorUnknownProperty<T extends string> =
	`Error: Unknown properties:${T}`
