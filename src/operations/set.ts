import { set as set_ } from 'firebase/database'
import { DatabaseReference, MetaType, FindType } from '../types'

export const set = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends FindType<T, U, 'write'>
>(
	ref: DatabaseReference<T, U>,
	value: V
) => {
	return set_(ref, value)
}
