import { Query, DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import { EventType } from '../alias'
import { DataSnapshot } from '../snapshots'

/**
 * Detaches a callback previously attached with the corresponding `on*()` (`onValue`, `onChildAdded`) listener.
 * Note: This is not the recommended way to remove a listener. Instead, please use the returned callback function from
 * the respective `on*` callbacks.
 *
 * Detach a callback previously attached with `on*()`. Calling `off()` on a parent listener
 * will not automatically remove listeners registered on child nodes, `off()`
 * must also be called on any child listeners to remove the callback.
 *
 * If a callback is not specified, all callbacks for the specified eventType
 * will be removed. Similarly, if no eventType is specified, all callbacks
 * for the `Reference` will be removed.
 *
 * Individual listeners can also be removed by invoking their unsubscribe
 * callbacks.
 *
 * @param query - The query that the listener was registered with.
 * @param eventType - One of the following strings: "value", "child_added",
 * "child_changed", "child_removed", or "child_moved." If omitted, all callbacks
 * for the `Reference` will be removed.
 * @param callback - The callback function that was passed to `on()` or
 * `undefined` to remove all callbacks.
 */
export type Off = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: Query<T, U> | DatabaseReference<T, U>,
	eventType?: EventType,
	callback?: (
		snapshot: DataSnapshot<T, U>,
		previousChildName?: string | null
	) => unknown
) => void
