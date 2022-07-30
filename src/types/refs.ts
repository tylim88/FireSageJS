import { MetaType, MetaTypeCreator } from './metaTypeCreator'
import { FindParentType, GetLastPart, FindParentKey } from './findParentType'
import { IsEqual } from './utils'
export declare interface DatabaseReference<
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string
> extends Query<T, U> {
	/**
	 * The last part of the `DatabaseReference`'s path.
	 *
	 * For example, `"ada"` is the key for
	 * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
	 *
	 * The key of a root `DatabaseReference` is `null`.
	 */
	readonly key: IsEqual<T['root'], T['base']> extends true
		? null
		: GetLastPart<U>
	/**
	 * The parent location of a `DatabaseReference`.
	 *
	 * The parent of a root `DatabaseReference` is `null`.
	 */
	readonly parent: IsEqual<T['root'], T['base']> extends true
		? null
		: DatabaseReference<
				MetaTypeCreator<FindParentType<T, U>, T['rootName'], T['root']>,
				FindParentKey<T, U> & keyof T['flattenRoot'] & string
		  >
	/** The root `DatabaseReference` of the Database. */
	readonly root: DatabaseReference<
		MetaTypeCreator<T['root'], T['rootName'], T['root']>,
		never
	>
}
export declare interface Query<
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string
> {
	/** The `DatabaseReference` for the `Query`'s location. */
	readonly ref: DatabaseReference<
		MetaTypeCreator<T['flattenRoot'][U], T['rootName'], T['root']>,
		U
	>
	/**
	 * Returns whether or not the current and provided queries represent the same
	 * location, have the same query parameters, and are from the same instance of
	 * `FirebaseApp`.
	 *
	 * Two `DatabaseReference` objects are equivalent if they represent the same location
	 * and are from the same instance of `FirebaseApp`.
	 *
	 * Two `Query` objects are equivalent if they represent the same location,
	 * have the same query parameters, and are from the same instance of
	 * `FirebaseApp`. Equivalent queries share the same sort order, limits, and
	 * starting and ending points.
	 *
	 * @param other - The query to compare against.
	 * @returns Whether or not the current and provided queries are equivalent.
	 */
	isEqual(
		other: Query<MetaTypeCreator<unknown, string, unknown>, never> | null
	): boolean
	/**
	 * Returns a JSON-serializable representation of this object.
	 *
	 * @returns A JSON-serializable representation of this object.
	 */
	toJSON(): string
	/**
	 * Gets the absolute URL for this location.
	 *
	 * The `toString()` method returns a URL that is ready to be put into a
	 * browser, curl command, or a `refFromURL()` call. Since all of those expect
	 * the URL to be url-encoded, `toString()` returns an encoded URL.
	 *
	 * Append '.json' to the returned URL when typed into a browser to download
	 * JSON-formatted data. If the location is secured (that is, not publicly
	 * readable), you will get a permission-denied error.
	 *
	 * @returns The absolute URL for this location.
	 */
	toString(): string
}

// export declare interface DatabaseReference_<T extends MetaType>
// 	extends Query_<T> {
// 	/**
// 	 * The last part of the `DatabaseReference`'s path.
// 	 *
// 	 * For example, `"ada"` is the key for
// 	 * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
// 	 *
// 	 * The key of a root `DatabaseReference` is `null`.
// 	 */
// 	readonly key: IsEqual<T['root'], T['base']> extends true
// 		? null
// 		: GetLastPart<T, U>
// 	/**
// 	 * The parent location of a `DatabaseReference`.
// 	 *
// 	 * The parent of a root `DatabaseReference` is `null`.
// 	 */
// 	readonly parent: IsEqual<T['root'], T['base']> extends true
// 		? null
// 		: DatabaseReference_<
// 				MetaTypeCreator<FindParentType<T, U>, T['rootName'], T['root']>
// 		  >
// 	/** The root `DatabaseReference` of the Database. */
// 	readonly root: DatabaseReference_<
// 		MetaTypeCreator<T['root'], T['rootName'], T['root']>
// 	>
// }
// export declare interface Query_<T extends MetaType> {
// 	/** The `DatabaseReference` for the `Query`'s location. */
// 	readonly ref: DatabaseReference_<T>
// 	/**
// 	 * Returns whether or not the current and provided queries represent the same
// 	 * location, have the same query parameters, and are from the same instance of
// 	 * `FirebaseApp`.
// 	 *
// 	 * Two `DatabaseReference` objects are equivalent if they represent the same location
// 	 * and are from the same instance of `FirebaseApp`.
// 	 *
// 	 * Two `Query` objects are equivalent if they represent the same location,
// 	 * have the same query parameters, and are from the same instance of
// 	 * `FirebaseApp`. Equivalent queries share the same sort order, limits, and
// 	 * starting and ending points.
// 	 *
// 	 * @param other - The query to compare against.
// 	 * @returns Whether or not the current and provided queries are equivalent.
// 	 */
// 	isEqual(
// 		other: Query<MetaTypeCreator<unknown, string, unknown>, never> | null
// 	): boolean
// 	/**
// 	 * Returns a JSON-serializable representation of this object.
// 	 *
// 	 * @returns A JSON-serializable representation of this object.
// 	 */
// 	toJSON(): string
// 	/**
// 	 * Gets the absolute URL for this location.
// 	 *
// 	 * The `toString()` method returns a URL that is ready to be put into a
// 	 * browser, curl command, or a `refFromURL()` call. Since all of those expect
// 	 * the URL to be url-encoded, `toString()` returns an encoded URL.
// 	 *
// 	 * Append '.json' to the returned URL when typed into a browser to download
// 	 * JSON-formatted data. If the location is secured (that is, not publicly
// 	 * readable), you will get a permission-denied error.
// 	 *
// 	 * @returns The absolute URL for this location.
// 	 */
// 	toString(): string
// }
