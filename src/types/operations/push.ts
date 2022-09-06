import {
	GetAllPushAblePaths,
	GetAllPushAbleOnlyPaths,
	FindNestedWriteTypeFromFullPath,
	FindAllTopLevelChildKeys,
	GetFullPath,
} from '../utils'
import { ErrorNotPushAble } from '../error'
import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'

export type Push = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: U extends GetAllPushAblePaths<T> | GetAllPushAbleOnlyPaths<T>
		? DatabaseReference<T, U>
		: ErrorNotPushAble<U>,
	value: FindNestedWriteTypeFromFullPath<
		T,
		U extends string ? `${U}/${string}` : keyof T['flatten_write'] & string
	>
) => Promise<
	DatabaseReference<
		T,
		GetFullPath<T, U, FindAllTopLevelChildKeys<T, U>> extends infer A extends
			| (keyof T['flatten_write'] & string)
			| undefined
			? A
			: never
	>
>
