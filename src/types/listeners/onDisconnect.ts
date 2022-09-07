import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import {
	IsValidSetValue,
	ValidateChildPaths,
	GetChildPathsType,
} from '../operations'
import { GetAllRemovablePaths } from '../utils'
import { ErrorNotRemoveAble } from '../error'

export type OnDisconnect = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U>
) => OnDisconnect_<T, U>

/**
 * The `onDisconnect` class allows you to write or clear data when your client
 * disconnects from the Database server. These updates occur whether your
 * client disconnects cleanly or not, so you can rely on them to clean up data
 * even if a connection is dropped or a client crashes.
 *
 * The `onDisconnect` class is most commonly used to manage presence in
 * applications where it is useful to detect how many clients are connected and
 * when other clients disconnect. See
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information.
 *
 * To avoid problems when a connection is dropped before the requests can be
 * transferred to the Database server, these functions should be called before
 * writing any data.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time you reconnect.
 */
declare class OnDisconnect_<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> {
	private constructor()
	/**
	 * Cancels all previously queued `onDisconnect()` set or update events for this
	 * location and all children.
	 *
	 * If a write has been queued for this location via a `set()` or `update()` at a
	 * parent location, the write at this location will be canceled, though writes
	 * to sibling locations will still occur.
	 *
	 * @returns Resolves when synchronization to the server is complete.
	 */
	cancel(): Promise<void>
	/**
	 * Ensures the data at this location is deleted when the client is disconnected
	 * (due to closing the browser, navigating to a new page, or network issues).
	 *
	 * @returns Resolves when synchronization to the server is complete.
	 */
	remove: U extends GetAllRemovablePaths<T>
		? () => Promise<void>
		: <V extends ErrorNotRemoveAble<U>>(
				arg: V extends never ? V : never
		  ) => Promise<void>
	/**
	 * Ensures the data at this location is set to the specified value when the
	 * client is disconnected (due to closing the browser, navigating to a new page,
	 * or network issues).
	 *
	 * `set()` is especially useful for implementing "presence" systems, where a
	 * value should be changed or cleared when a user disconnects so that they
	 * appear "offline" to other users. See
	 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
	 * for more information.
	 *
	 * Note that `onDisconnect` operations are only triggered once. If you want an
	 * operation to occur each time a disconnect occurs, you'll need to re-establish
	 * the `onDisconnect` operations each time.
	 *
	 * @param value - The value to be written to this location on disconnect (can
	 * be an object, array, string, number, boolean, or null).
	 * @returns Resolves when synchronization to the Database is complete.
	 */
	set: <V>(
		value: V extends never ? V : IsValidSetValue<T, U, V>
	) => Promise<void>
	/**
	 * Writes multiple values at this location when the client is disconnected (due
	 * to closing the browser, navigating to a new page, or network issues).
	 *
	 * The `values` argument contains multiple property-value pairs that will be
	 * written to the Database together. Each child property can either be a simple
	 * property (for example, "name") or a relative path (for example, "name/first")
	 * from the current location to the data to update.
	 *
	 * As opposed to the `set()` method, `update()` can be use to selectively update
	 * only the referenced properties at the current location (instead of replacing
	 * all the child properties at the current location).
	 *
	 * @param paths — array containing relative child paths.
	 * @param values - array containing values respective to the paths.
	 * @returns Resolves when synchronization to the Database is complete.
	 */
	update: <N extends readonly string[], V extends readonly unknown[]>(
		paths: N extends never ? N : ValidateChildPaths<T, U, N>,
		values: V extends never ? V : GetChildPathsType<T, U, N, V>
	) => Promise<void>
}
