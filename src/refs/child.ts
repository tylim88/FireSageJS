import { child as child_ } from 'firebase/database'
import {
	MetaType,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
	GetFullPath,
} from '../types'

export const child = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends FindAllChildKeys<T, U> extends never
		? ErrorHasNoChild<U>
		: FindAllChildKeys<T, U>
>(
	parent: DatabaseReference<T, U>,
	path: V
) => {
	return child_(parent as any, path) as DatabaseReference<
		T,
		GetFullPath<T, U, V>
	>
}
