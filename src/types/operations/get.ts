import { DatabaseReference, Query } from '../refs'
import { DataSnapshot } from '../snapshots'
import { MetaType } from '../metaType'
/**
Gets the most up-to-date result for this query.

@param query — The query to run.

@returns
A Promise which resolves to the resulting DataSnapshot if a value is available, or rejects if the client is unable to return a value (e.g., if the server is unreachable and there is nothing cached).
 */
export type Get = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: DatabaseReference<T, U> | Query<T, U>
) => Promise<DataSnapshot<T, U>>
