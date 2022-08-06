import { child as child_ } from 'firebase/database'
import {
	MetaType,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
	GetFullPath,
} from '../types'

/**
Gets a Reference for the location at the specified relative path.

The relative path can either be a simple child name (for example, "ada") or a deeper slash-separated path (for example, "ada/name/first").

@param parent — The parent location.

@param path
A relative path from this location to the desired child location.

@returns — The specified child location.
 */
export const child = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends FindAllChildKeys<T, U> extends never
		? ErrorHasNoChild<U>
		: FindAllChildKeys<T, U>
>(
	parent: DatabaseReference<T, U>,
	path: V
) => {
	return child_(parent as any, path) as DatabaseReference<
		T,
		GetFullPath<T, U, V>
	>
}
