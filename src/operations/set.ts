import { set as set_ } from 'firebase/database'
import { DatabaseReference, MetaType, FindType } from '../types'

export const set = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U>,
	value: FindType<T, U, 'write'>
) => {
	return set_(ref as any, value)
}
