import { remove as remove_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	IfIsRemoveAbleThenReturnV,
} from '../types'

/**
Removes the data at this Database location.

Any data at child locations will also be deleted.

The effect of the remove will be visible immediately and the corresponding event 'value' will be triggered. Synchronization of the remove to the Firebase servers will also be started, and the returned Promise will resolve when complete. If provided, the onComplete callback will be called asynchronously after synchronization has finished.

@param ref — The location to remove.

@returns — Resolves when remove on server is complete.
 */
export const remove = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U> extends never
		? DatabaseReference<T, U>
		: IfIsRemoveAbleThenReturnV<T, U, DatabaseReference<T, U>>
) => {
	return remove_(ref as any)
}
