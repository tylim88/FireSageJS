import { update as update_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	FindAllChildKeys,
	FindNestedType,
	GetFullPath,
} from '../types'

export const update = <
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | undefined
>(
	ref: DatabaseReference<T, U>,
	value: {
		[K in FindAllChildKeys<T, U>]: FindNestedType<T, GetFullPath<T, U, K>>
	}
) => {
	return update_(ref, value)
}
