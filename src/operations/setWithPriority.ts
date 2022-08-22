import { setWithPriority as setWithPriority_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	IsValidSetPriorityRef,
	IsValidSetDataType,
} from '../types'
/**
Writes data the Database location. Like set() but also specifies the priority for that data.

Applications need not use priority but can order collections by ordinary properties (see | Sorting and filtering data ).

@param ref — The location to write to.

@param value
The value to be written (string, number, boolean, object, array, or null).

@param priority — The priority to be written (string, number, or null).

@returns — Resolves when write to server is complete.
 */
export const setWithPriority = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: IsValidSetPriorityRef<T, U>,
	value: V extends never ? V : IsValidSetDataType<T, U, V>,
	priority: string | number | null
) => {
	return setWithPriority_(
		// @ts-expect-error
		ref,
		value,
		priority
	)
}
