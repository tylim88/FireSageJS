import { MetaType } from '../metaType'
import { ErrorInvalidSetPriorityRef, ErrorIsPushOnlyAbleType } from './error'
import {
	GetAllPushAbleOnlyPaths,
	ReplaceNumericRecordIfInputIsRecordString as ReplaceNumericIndexRecordIfInputIsStringIndexRecord,
	FindNestedWriteTypeFromFullPath,
	IsParentRecordOrArray,
} from '../utils'
import { DatabaseReference } from '../refs'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsParentRecordOrArray<T, U, ErrorInvalidSetPriorityRef<U>>

export type IsValidSetValue<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> = ReplaceNumericIndexRecordIfInputIsStringIndexRecord<
	V,
	FindNestedWriteTypeFromFullPath<T, U>
>

export type IsValidSetRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends GetAllPushAbleOnlyPaths<T>
	? ErrorIsPushOnlyAbleType<U>
	: DatabaseReference<T, U>
