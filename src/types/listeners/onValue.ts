import { MetaType } from '../metaType'
import { DatabaseReference } from '../refs'
import { DataSnapshot } from '../snapshots'
import { Unsubscribe, ListenOptions } from '../alias'

export type OnValue = {
	/**
Listens for data changes at a particular location.

This is the primary way to read data from a Database. Your callback will be triggered for the initial data and again whenever the data changes. Invoke the returned unsubscribe callback to stop receiving updates. [See Retrieve Data on the Web](https://firebase.google.com/docs/database/web/read-and-write) for more details.

An onValue event will trigger once with the initial data stored at this location, and then trigger again each time the data changes. The DataSnapshot passed to the callback will be for the location at which on() was called. It won't trigger until the entire contents has been synchronized. If the location has no data, it will be triggered with an empty DataSnapshot (val() will return null).

@param ref — The location to read from.

@param callback
A callback that fires when the specified event occurs. The callback will be passed a DataSnapshot.

@param options optional, whether to remove the listener after its first invocation. 

@returns — A function that can be invoked to remove the listener.
 */
	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		ref: DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		options?: ListenOptions
	): Unsubscribe
	/**
Listens for data changes at a particular location.

This is the primary way to read data from a Database. Your callback will be triggered for the initial data and again whenever the data changes. Invoke the returned unsubscribe callback to stop receiving updates. [See Retrieve Data on the Web](https://firebase.google.com/docs/database/web/read-and-write) for more details.

An onValue event will trigger once with the initial data stored at this location, and then trigger again each time the data changes. The DataSnapshot passed to the callback will be for the location at which on() was called. It won't trigger until the entire contents has been synchronized. If the location has no data, it will be triggered with an empty DataSnapshot (val() will return null).

@param ref — The location to read from.

@param callback
A callback that fires when the specified event occurs. The callback will be passed a DataSnapshot.

@param cancelCallback
An optional callback that will be notified if your event subscription is ever canceled because your client does not have permission to read this data (or it had permission but has now lost it). This callback will be passed an Error object indicating why the failure occurred.

@param options optional, whether to remove the listener after its first invocation. 

@returns — A function that can be invoked to remove the listener.
 */
	<
		T extends MetaType,
		U extends (keyof T['flatten_write'] & string) | undefined
	>(
		ref: DatabaseReference<T, U>,
		callback: (snapshot: DataSnapshot<T, U>) => unknown,
		cancelCallback?: (error: Error) => unknown,
		options?: ListenOptions
	): Unsubscribe
}
