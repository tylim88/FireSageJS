import { MetaType } from '../metaType'
import { ErrorInvalidSetPriorityRef, ErrorIsPushOnlyAbleType } from './error'
import {
	GetAllPushAbleOnlyPaths,
	ReplaceNumericRecordIfInputIsRecordString,
	FindNestedWriteTypeFromFullPath,
	IsParentRecordOrArray,
} from '../utils'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsParentRecordOrArray<T, U, ErrorInvalidSetPriorityRef<U>>

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
