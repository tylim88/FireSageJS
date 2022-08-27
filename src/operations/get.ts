import { get as get_ } from 'firebase/database'
import { DatabaseReference, MetaType, DataSnapshot, Query } from '../types'

// get runtime is tested together with set and update
/**
Gets the most up-to-date result for this query.

@param query — The query to run.

@returns
A Promise which resolves to the resulting DataSnapshot if a value is available, or rejects if the client is unable to return a value (e.g., if the server is unreachable and there is nothing cached).
 */
export const get = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: DatabaseReference<T, U> | Query<T, U>
) => {
	return get_(query) as unknown as Promise<DataSnapshot<T, U>>
}
