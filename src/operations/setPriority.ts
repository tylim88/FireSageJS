import { setPriority as setPriority_ } from 'firebase/database'
import { DatabaseReference, MetaType, IsValidSetPriorityRef } from '../types'
/**
Sets a priority for the data at this Database location.

Applications need not use priority but can order collections by ordinary properties (see | Sorting and filtering data ).

@param ref — The location to write to.

@param priority — The priority to be written (string, number, or null).

@returns — Resolves when write to server is complete.
 */
export const setPriority = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: IsValidSetPriorityRef<T, U>,
	priority: string | number | null
) => {
	return setPriority_(
		// @ts-expect-error
		ref,
		priority
	)
}
