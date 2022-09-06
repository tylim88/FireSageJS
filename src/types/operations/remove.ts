import { GetAllRemovablePaths } from '../utils'
import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import { ErrorNotRemoveAble } from '../error'

export type Remove = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U> extends never
		? DatabaseReference<T, U>
		: U extends GetAllRemovablePaths<T>
		? DatabaseReference<T, U>
		: ErrorNotRemoveAble<U>
) => Promise<void>
