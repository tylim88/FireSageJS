import { MetaType } from '../metaType'
import { ErrorInvalidQueryType, ErrorInvalidCursorType } from './error'
import { IsRecordOrArray, FindNestedWriteTypeFromFullPath } from '../utils'

export type IsValidQueryRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsRecordOrArray<T, U, ErrorInvalidQueryType<U>>

export type IsValidCursorType<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = FindNestedWriteTypeFromFullPath<T, U> extends
	| string
	| number
	| boolean
	| null
	? FindNestedWriteTypeFromFullPath<T, U>
	: ErrorInvalidCursorType
