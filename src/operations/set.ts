import { set as set_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	IsValidSetValue,
	IsValidSetRef,
} from '../types'
/**
Writes data to this Database location.

This will overwrite any data at this location and all child locations.

The effect of the write will be visible immediately, and the corresponding events ("value", "child_added", etc.) will be triggered. Synchronization of the data to the Firebase servers will also be started, and the returned Promise will resolve when complete. If provided, the onComplete callback will be called asynchronously after synchronization has finished.

Passing null for the new value is equivalent to calling remove(); namely, all data at this location and all child locations will be deleted.

set() will remove any priority stored at this location, so if priority is meant to be preserved, you need to use setWithPriority() instead.

Note that modifying data with set() will cancel any pending transactions at that location, so extreme care should be taken if mixing set() and transaction() to modify the same data.

A single set() will generate a single "value" event at the location where the set() was performed.

@param ref — The location to write to.
 */
export const set = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	R extends DatabaseReference<T, U>,
	V
>(
	ref: R extends never ? R : IsValidSetRef<T, U>,
	value: V extends never ? V : IsValidSetValue<T, U, V>
) => {
	return set_(ref as any, value)
}
