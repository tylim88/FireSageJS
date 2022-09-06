import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import { ErrorInvalidSetPriorityRef } from './error'
import { IsParentRecordOrArray } from '../utils'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsParentRecordOrArray<T, U, ErrorInvalidSetPriorityRef<U>>

export type SetPriority = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: IsValidSetPriorityRef<T, U>,
	priority: string | number | null
) => Promise<void>
