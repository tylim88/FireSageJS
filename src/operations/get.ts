import { get as get_ } from 'firebase/database'
import { DatabaseReference, MetaType, DataSnapshot, Query } from '../types'

// get runtime is tested together with set and update
/**
Gets the most up-to-date result for this query.

@param ref — The location to read from.

@returns
A Promise which resolves to the resulting DataSnapshot if a value is available, or rejects if the client is unable to return a value (e.g., if the server is unreachable and there is nothing cached).
 */
export const get = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U> | Query<T, U>
) => {
	return get_(ref) as unknown as Promise<DataSnapshot<T, U>>
}
