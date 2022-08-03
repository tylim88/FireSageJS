import { child as child_ } from 'firebase/database'
import {
	MetaType,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
	GetFullPath,
} from '../types'

export const child = <
	//  eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends DatabaseReference<MetaType, any>,
	T extends S extends DatabaseReference<infer I, infer Z>
		? { type: I; path: Z }
		: never,
	U extends FindAllChildKeys<T['type'], T['path']> extends never
		? ErrorHasNoChild<T['path']>
		: FindAllChildKeys<T['type'], T['path']>
>(
	parent: S,
	path: U
) => {
	return child_(parent, path) as DatabaseReference<
		T['type'],
		GetFullPath<T['type'], T['path'], U>
	>
}
