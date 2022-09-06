import { get as get_ } from 'firebase/database'
import { Get } from '../types'
import { dataSnapshotTransformer } from '../utils'
/**
 * Gets the most up-to-date result for this query.
 *
 * @param query - The query to run.
 * @returns A `Promise` which resolves to the resulting DataSnapshot if a value is
 * available, or rejects if the client is unable to return a value (e.g., if the
 * server is unreachable and there is nothing cached).
 */
// @ts-expect-error
export const get: Get = query => {
	return get_(query).then(dataSnapshot => {
		return dataSnapshotTransformer(dataSnapshot)
	})
}
