import { onChildMoved as onChildMoved_ } from 'firebase/database'
import { OnChild } from '../types'
import { listenerCreator } from './utils'

/**
 * Listens for data changes at a particular location.
 *
 * This is the primary way to read data from a Database. Your callback
 * will be triggered for the initial data and again whenever the data changes.
 * Invoke the returned unsubscribe callback to stop receiving updates. See
 * {@link https://firebase.google.com/docs/database/web/retrieve-data | Retrieve Data on the Web}
 * for more details.
 *
 * An `onChildMoved` event will be triggered when a child's sort order changes
 * such that its position relative to its siblings changes. The `DataSnapshot`
 * passed to the callback will be for the data of the child that has moved. It
 * is also passed a second argument which is a string containing the key of the
 * previous sibling child by sort order, or `null` if it is the first child.
 *
 * @param query - The query to run.
 * @param callback - A callback that fires when the specified event occurs.
 * The callback will be passed a DataSnapshot and a string containing the key of
 * the previous child, by sort order, or `null` if it is the first child.
 * @param cancelCallback - optional and skippable(function overloading), a callback that will be notified if your
 * event subscription is ever canceled because your client does not have
 * permission to read this data (or it had permission but has now lost it).
 * This callback will be passed an `Error` object indicating why the failure
 * occurred.
 * @param options - optional, an object that can be used to configure `onlyOnce`, which
 * then removes the listener after its first invocation.
 * @returns A function that can be invoked to remove the listener.
 */
export const onChildMoved: OnChild = (
	query,
	callback,
	cancelCallback,
	options?
) => {
	return listenerCreator(
		onChildMoved_,
		// @ts-expect-error
		query,
		callback,
		cancelCallback,
		options
	)
}
