import { FindAllChildKeys, GetFullPath, ReplaceInvalidSegment } from './utils'
import { MetaType } from './metaType'
import {
	ErrorHasNoChild,
	ErrorNeedStringSegment,
	ErrorInvalidOrNeedNumericSegment,
} from './error'

export type ValidateChildPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends string
> = FindAllChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: ReplaceInvalidSegment<
			T,
			GetFullPath<T, U, V>
	  > extends ErrorNeedStringSegment
	? ErrorNeedStringSegment
	: ReplaceInvalidSegment<
			T,
			GetFullPath<T, U, V>
	  > extends ErrorInvalidOrNeedNumericSegment
	? ErrorInvalidOrNeedNumericSegment
	: V
