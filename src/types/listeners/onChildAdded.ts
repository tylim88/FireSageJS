import { MetaType } from '../metaType'
import { Query } from '../refs'
import { Unsubscribe, ListenOptions } from '../alias'
import { IsValidOnChildRef, GetOnChildSnapshot } from './utils'

export declare type OnChildAdded = {
	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		query: string extends never ? Query<T, U> : IsValidOnChildRef<T, U>,
		callback: (
			snapshot: GetOnChildSnapshot<T, U>,
			previousChildName: string | null
		) => unknown,
		options?: ListenOptions
	): Unsubscribe

	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		query: string extends never ? Query<T, U> : IsValidOnChildRef<T, U>,
		callback: (
			snapshot: GetOnChildSnapshot<T, U>,
			previousChildName: string | null
		) => unknown,
		cancelCallback: (error: Error) => unknown,
		options?: ListenOptions
	): Unsubscribe
}
