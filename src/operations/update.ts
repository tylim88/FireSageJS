import { update as update_ } from 'firebase/database'
import { Update } from '../types'

/**
 * Writes multiple values to the Database at once.
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * A single `update()` will generate a single "value" event at the location
 * where the `update()` was performed, regardless of how many children were
 * modified.
 *
 * Note that modifying data with `update()` will cancel any pending
 * transactions at that location, so extreme care should be taken if mixing
 * `update()` and `transaction()` to modify the same data.
 *
 * Passing `null` to `update()` will remove the data at this location.
 *
 * See
 * {@link https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html | Introducing multi-location updates and more}.
 *
 * @param ref - The location to write to.
 * @param paths — array containing relative child paths.
 * @param values - array containing values respective to the paths.
 * Eg: given paths ['a','b','c'] and values [1, 2, 3], 1 will be written to path 'a',
 * 2 will be written to path 'b' and 3 will be written to path 'c'.
 * @returns Resolves when update on server is complete.
 */
export const update: Update = (ref, paths, values) => {
	const obj: Record<string, unknown> = {}

	paths.forEach((item, index) => {
		obj[item] = values[index]
	})

	return update_(ref as any, obj)
}
