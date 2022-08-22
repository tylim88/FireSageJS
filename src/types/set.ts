import { IsChildObjectOrArray } from './utils'
import { MetaType } from './metaType'
import { ErrorInvalidSetPriorityRef } from './error'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsChildObjectOrArray<T, U, ErrorInvalidSetPriorityRef<U>>
