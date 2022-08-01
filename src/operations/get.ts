import { get as get_ } from 'firebase/database'
import { DatabaseReference, MetaType, DataSnapshot } from '../types'

// get is tested together with set
export const get = <
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string
>(
	ref: DatabaseReference<T, U>
) => {
	return get_(ref) as unknown as Promise<DataSnapshot<T, U>>
}
