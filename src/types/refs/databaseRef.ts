import { MetaType, MetaTypeCreator } from '../metaType'
import { FindParentKey } from '../utils'
import { GetLastSegment } from '../tsUtils'

export declare interface ThenableReference<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends DatabaseReference<T, U> {}

/**
 * A `DatabaseReference` represents a specific location in your Database and can be used
 * for reading or writing data to that Database location.
 *
 * You can reference the root or child location in your Database by calling
 * `ref()` or `ref("child/path")`.
 *
 * Writing is done with the `set()` method and reading can be done with the
 * `on*()` method. See [Read And Write](https://firebase.google.com/docs/database/web/read-and-write).
 */
export declare interface DatabaseReference<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> extends Query<T, U> {
	/**
	 * The last part of the `DatabaseReference`'s path.
	 *
	 * For example, `"ada"` is the key for
	 * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
	 *
	 * The key of a root `DatabaseReference` is `null`.
	 */
	readonly key: U extends string ? GetLastSegment<U> : null
	/**
	 * The parent location of a `DatabaseReference`.
	 *
	 * The parent of a root `DatabaseReference` is `null`.
	 */
	readonly parent: U extends string
		? DatabaseReference<
				MetaTypeCreator<T['base']>,
				FindParentKey<T, U> & keyof T['flatten_write'] & string
		  >
		: null
	/** The root `DatabaseReference` of the Database. */
	readonly root: DatabaseReference<MetaTypeCreator<T['base']>, undefined>
}

/**
 * A `Query` sorts and filters the data at a Database location so only a subset
 * of the child data is included. This can be used to order a collection of
 * data by some attribute (for example, height of dinosaurs) as well as to
 * restrict a large list of items (for example, chat messages) down to a number
 * suitable for synchronizing to the client. Queries are created by chaining
 * together one or more of the filter methods defined here.
 *
 * Just as with a `DatabaseReference`, you can receive data from a `Query` by using the
 * `on*()` methods. You will only receive events and `DataSnapshot`s for the
 * subset of the data that matches your query.
 *
 * See [Sorting And Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data)
 * for more information.
 */
export declare interface Query<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
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
