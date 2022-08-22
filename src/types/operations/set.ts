import { MetaType } from '../metaType'
import { ErrorInvalidSetPriorityRef, ErrorIsPushOnlyAbleType } from './error'
import {
	GetAllPushAbleOnlyPaths,
	ReplaceNumericRecordIfInputIsRecordString,
	FindNestedWriteTypeFromFullPath,
	IsChildObjectOrArray,
} from '../utils'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsChildObjectOrArray<T, U, ErrorInvalidSetPriorityRef<U>>

export type IsValidSetDataType<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> = U extends GetAllPushAbleOnlyPaths<T>
	? ErrorIsPushOnlyAbleType<U>
	: ReplaceNumericRecordIfInputIsRecordString<
			V,
			FindNestedWriteTypeFromFullPath<T, U>
	  >
