import { GetAllRemovablePaths } from '../utils'
import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import { ErrorNotRemoveAble } from '../error'
/**
Removes the data at this Database location.

Any data at child locations will also be deleted.

The effect of the remove will be visible immediately and the corresponding event 'value' will be triggered. Synchronization of the remove to the Firebase servers will also be started, and the returned Promise will resolve when complete. If provided, the onComplete callback will be called asynchronously after synchronization has finished.

@param ref — The location to remove.

@returns — Resolves when remove on server is complete.
 */
export type Remove = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U> extends never
		? DatabaseReference<T, U>
		: U extends GetAllRemovablePaths<T>
		? DatabaseReference<T, U>
		: ErrorNotRemoveAble<U>
) => Promise<void>
