import { get as get_ } from 'firebase/database'
import { DatabaseReference, MetaType, DataSnapshot } from '../types'

// get runtime is tested together with set and update
export const get = <
	T extends MetaType,
	U extends (keyof T['flatten_read'] & string) | undefined
>(
	ref: DatabaseReference<T, U>
) => {
	return get_(ref as any) as unknown as Promise<DataSnapshot<T, U>>
}
