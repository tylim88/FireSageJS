import { MetaType } from '../types'
import { DatabaseReference } from './refs'
import { DataSnapshot } from './snapshots'
import { Unsubscribe, ListenOptions } from './alias'

export type OnValue = {
	<
		T extends MetaType,
		U extends (keyof T['flatten_read'] & string) | undefined
	>(
		ref: DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		options?: ListenOptions
	): Unsubscribe
	<
		T extends MetaType,
		U extends (keyof T['flatten_read'] & string) | undefined
	>(
		ref: DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		cancelCallback?: (error: Error) => unknown,
		options?: ListenOptions
	): Unsubscribe
}
