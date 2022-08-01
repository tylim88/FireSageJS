import { set as set_ } from 'firebase/database'
import { DatabaseReference, MetaType } from '../types'

export const set = <
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string,
	V extends T['flattenBase'][U]
>(
	ref: DatabaseReference<T, U>,
	value: V
) => {
	return set_(ref, value)
}
