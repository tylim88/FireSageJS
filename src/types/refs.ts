import { MetaType, MetaTypeCreator } from './metaTypeCreator'
import { GetLastPart, FindParentKey } from './findParentType'

export declare interface DatabaseReference<
	T extends MetaType,
	U extends (keyof T['flatten_base'] & string) | undefined
> extends Query<T, U> {
	/**
	 * The last part of the `DatabaseReference`'s path.
	 *
	 * For example, `"ada"` is the key for
	 * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
	 *
	 * The key of a root `DatabaseReference` is `null`.
	 */
	readonly key: U extends string ? GetLastPart<U> : null
	/**
	 * The parent location of a `DatabaseReference`.
	 *
	 * The parent of a root `DatabaseReference` is `null`.
	 */
	readonly parent: U extends string
		? DatabaseReference<
				MetaTypeCreator<T['base']>,
				FindParentKey<T, U> & keyof T['flatten_base'] & string
		  >
		: null
	/** The root `DatabaseReference` of the Database. */
	readonly root: DatabaseReference<MetaTypeCreator<T['base']>, undefined>
}
export declare interface Query<
	T extends MetaType,
	U extends (keyof T['flatten_base'] & string) | undefined
> {
	/** The `DatabaseReference` for the `Query`'s location. */
	readonly ref: DatabaseReference<MetaTypeCreator<T['base']>, U>
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
	isEqual(other: Query<any, any> | null): boolean
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
