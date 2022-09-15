import { GetFullPath, ValidateChildPath } from '../utils'
import { DatabaseReference } from './databaseRef'

export type Child = <
	S extends DatabaseReference<any, any>,
	T extends S extends DatabaseReference<infer X, any> ? X : never,
	U extends S extends DatabaseReference<any, infer X> ? X : never,
	V extends string
>(
	parent: S,
	path: V extends never ? V : ValidateChildPath<T, U, Exclude<V, ''>> // ! why V union with empty string
) => DatabaseReference<
	T,
	// ! this generic does not trigger "GetFullPath<T, U, V> is not assignable to (keyof T['flatten_write'] & string) | undefined"
	GetFullPath<T, U, V> extends infer A extends
		| (keyof T['flatten_write'] & string)
		| undefined
		? A
		: never
>
