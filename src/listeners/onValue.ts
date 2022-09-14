import { onValue as onValue_ } from 'firebase/database'
import { OnValue } from '../types'
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
 * An `onValue` event will trigger once with the initial data stored at this
 * location, and then trigger again each time the data changes. The
 * `DataSnapshot` passed to the callback will be for the location at which
 * `on()` was called. It won't trigger until the entire contents has been
 * synchronized. If the location has no data, it will be triggered with an empty
 * `DataSnapshot` (`val()` will return `null`).
 *
 * @param query - The query to run.
 * @param callback - A callback that fires when the specified event occurs. The
 * callback will be passed a DataSnapshot.
 * @param cancelCallback - optional and skippable(function overloading), a callback that will be notified if your
 * event subscription is ever canceled because your client does not have
 * permission to read this data (or it had permission but has now lost it).
 * This callback will be passed an `Error` object indicating why the failure
 * occurred.
 * @param options - optional, an object that can be used to configure `onlyOnce`, which
 * then removes the listener after its first invocation.
 * @returns A function that can be invoked to remove the listener.
 */
export const onValue: OnValue = (query, callback, cancelCallback, options?) => {
	return listenerCreator(onValue_, query, callback, cancelCallback, options)
}
