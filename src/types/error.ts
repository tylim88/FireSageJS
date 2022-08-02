export type ErrorHasNoChild = 'Error: This parent node has no child'
export type ErrorInvalidData<T extends string> =
	`The ${T} node has invalid data type and is replaced with this error message. Valid data type is boolean, number, string and object literal`
