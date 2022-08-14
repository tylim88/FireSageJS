import { FindAllChildKeys } from './findTypeAndKey'
import { DetectInvalidSegment } from './detectInvalidSegment'
import { MetaType } from './metaType'
import { GetFullPath } from './getPath'
import {
	ErrorHasNoChild,
	ErrorInvalidPathTypeNeedString,
	ErrorInvalidPathTypeOrNeedNumber,
} from './error'

export type ValidateChildPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends string
> = FindAllChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: DetectInvalidSegment<
			T,
			GetFullPath<T, U, V>
	  > extends ErrorInvalidPathTypeNeedString
	? ErrorInvalidPathTypeNeedString
	: DetectInvalidSegment<
			T,
			GetFullPath<T, U, V>
	  > extends ErrorInvalidPathTypeOrNeedNumber
	? ErrorInvalidPathTypeOrNeedNumber
	: V
