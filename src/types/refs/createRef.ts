import { MetaType } from '../metaType'
import { DatabaseReference } from '../refs'
import { ValidateFullPath } from '../utils'
import { Database } from '../alias'

export type CreateRef = <T extends MetaType>(database?: Database) => Ref<T>

export type Ref<T extends MetaType> = {
	/**
	 Returns a Reference representing the location in the Database corresponding to the provided path. If no path is provided, the Reference will point to the root of the Database.

@param path
Optional path representing the location the returned Reference will point. If not provided, the returned Reference will point to the root of the Database.

@returns
If a path is provided, a Reference pointing to the provided path. Otherwise, a Reference pointing to the root of the Database.
	 */
	<U extends (keyof T['flatten_write'] & string) | undefined = undefined>(
		path?: U extends keyof T['flatten_write'] & string
			? ValidateFullPath<T, U>
			: U
	): DatabaseReference<
		T,
		U extends string
			? ValidateFullPath<T, U, U, never, never, never>
			: undefined
	>
	/**
	 Returns a Reference representing the location in the Database corresponding to the provided path. If no path is provided, the Reference will point to the root of the Database.

@param db — The database instance to obtain a reference for.

@param path
Optional path representing the location the returned Reference will point. If not provided, the returned Reference will point to the root of the Database.

@returns
If a path is provided, a Reference pointing to the provided path. Otherwise, a Reference pointing to the root of the Database.
	 */
	<U extends (keyof T['flatten_write'] & string) | undefined = undefined>(
		db: Database,
		path?: U extends keyof T['flatten_write'] & string
			? ValidateFullPath<T, U>
			: U
	): DatabaseReference<
		T,
		U extends string
			? ValidateFullPath<T, U, U, never, never, never>
			: undefined
	>
}
