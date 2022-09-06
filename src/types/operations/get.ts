import { DatabaseReference, Query } from '../refs'
import { DataSnapshot } from '../snapshots'
import { MetaType } from '../metaType'

export type Get = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: DatabaseReference<T, U> | Query<T, U>
) => Promise<DataSnapshot<T, U>>
