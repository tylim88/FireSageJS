import { MetaType } from '../metaType'
import { Query, DatabaseReference } from '../refs'
import { DataSnapshot } from '../snapshots'
import { Unsubscribe, ListenOptions } from '../alias'

export type OnValue = {
	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		query: Query<T, U> | DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		options?: ListenOptions
	): Unsubscribe
	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		query: Query<T, U> | DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		cancelCallback: (error: Error) => unknown,
		options?: ListenOptions
	): Unsubscribe
}
