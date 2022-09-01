import { child as child_ } from 'firebase/database'
import { DatabaseReference, GetFullPath, ValidateChildPath } from '../types'

/**
Gets a Reference for the location at the specified relative path.

The relative path can either be a simple child name (for example, "ada") or a deeper slash-separated path (for example, "ada/name/first").

@param parent — The parent location.

@param path
A relative path from this location to the desired child location.

@returns — The specified child location.
 */
export const child = <
	S extends DatabaseReference<any, any>,
	T extends S extends DatabaseReference<infer X, any> ? X : never,
	U extends S extends DatabaseReference<any, infer X> ? X : never,
	V extends string
>(
	parent: S,
	path: V extends never ? V : ValidateChildPath<T, U, Exclude<V, ''>> // ! why V union with empty string
) => {
	return child_(parent as any, path) as DatabaseReference<
		T,
		GetFullPath<T, U, Exclude<V, ''>>
	>
}
