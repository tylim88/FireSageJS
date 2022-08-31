import { MetaType } from './metaType'
import { DatabaseReference } from './databaseReference'
import {
	FindAllTopLevelChildKeys,
	GetFullPath,
	GetLastSegment,
	FindNestedReadTypeFromFullPath,
	ValidateChildPath,
} from './utils'
import { ErrorHasNoChild } from './error'

export declare class DataSnapshot<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> {
	/**
	 * The location of this DataSnapshot.
	 */
	readonly ref: DatabaseReference<T, U>
	private constructor()
	/**
	 * The key (last part of the path) of the location of this `DataSnapshot`.
	 *
	 * The last token in a Database location is considered its key. For example,
	 * "ada" is the key for the /users/ada/ node. Accessing the key on any
	 * `DataSnapshot` will return the key for the location that generated it.
	 * However, accessing the key on the root URL of a Database will return
	 * `null`.
	 */
	get key(): U extends string ? GetLastSegment<U> : null
	/** Returns the number of child properties of this `DataSnapshot`. */
	get size(): number
	/**
	 * Gets another `DataSnapshot` for the location at the specified relative path.
	 *
	 * Passing a relative path to the `child()` method of a DataSnapshot returns
	 * another `DataSnapshot` for the location at the specified relative path. The
	 * relative path can either be a simple child name (for example, "ada") or a
	 * deeper, slash-separated path (for example, "ada/name/first"). If the child
	 * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
	 * whose value is `null`) is returned.
	 *
	 * @param path - A relative path to the location of child data.
	 */
	child<V extends string>(
		path: V extends never ? V : ValidateChildPath<T, U, V>
	): DataSnapshot<T, GetFullPath<T, U, V>>
	/**
	 * Returns true if this `DataSnapshot` contains any data. It is slightly more
	 * efficient than using `snapshot.val() !== null`.
	 */
	exists(): boolean
	/**
	 * Enumerates the top-level children in the `DataSnapshot`.
	 *
	 * Because of the way JavaScript objects work, the ordering of data in the
	 * JavaScript object returned by `val()` is not guaranteed to match the
	 * ordering on the server nor the ordering of `onChildAdded()` events. That is
	 * where `forEach()` comes in handy. It guarantees the children of a
	 * `DataSnapshot` will be iterated in their query order.
	 *
	 * If no explicit `orderBy*()` method is used, results are returned
	 * ordered by key (unless priorities are used, in which case, results are
	 * returned by priority).
	 *
	 * @param action - A function that will be called for each child DataSnapshot.
	 * The callback can return true to cancel further enumeration.
	 * @returns true if enumeration was canceled due to your callback returning
	 * true.
	 */
	forEach(
		action: (
			child: FindAllTopLevelChildKeys<T, U> extends never
				? ErrorHasNoChild<U>
				: GetFullPath<T, U, FindAllTopLevelChildKeys<T, U>> extends infer R
				? R extends (keyof T['flatten_write'] & string) | undefined
					? DataSnapshot<T, R>
					: never
				: never,
			index: number
		) => boolean | void
	): boolean
	/**
	 * Returns true if the specified child path has (non-null) data.
	 *
	 * @param path - A relative path to the location of a potential child.
	 * @returns `true` if data exists at the specified child path; else
	 *  `false`.
	 */
	hasChild<V extends string>(
		path: V extends never ? V : ValidateChildPath<T, U, V>
	): boolean
	/**
	 * Returns whether or not the `DataSnapshot` has any non-`null` child
	 * properties.
	 *
	 * You can use `hasChildren()` to determine if a `DataSnapshot` has any
	 * children. If it does, you can enumerate them using `forEach()`. If it
	 * doesn't, then either this snapshot contains a primitive value (which can be
	 * retrieved with `val()`) or it is empty (in which case, `val()` will return
	 * `null`).
	 *
	 * @returns true if this snapshot has any children; else false.
	 */
	hasChildren(): boolean
	/**
	 * Returns a JSON-serializable representation of this object.
	 */
	toJSON(): FindNestedReadTypeFromFullPath<T, U> | null
	/**
	 * Extracts a JavaScript value from a `DataSnapshot`.
	 *
	 * Depending on the data in a `DataSnapshot`, the `val()` method may return a
	 * scalar type (string, number, or boolean), an array, or an object. It may
	 * also return null, indicating that the `DataSnapshot` is empty (contains no
	 * data).
	 *
	 * @returns The DataSnapshot's contents as a JavaScript value (Object,
	 *   Array, string, number, boolean, or `null`).
	 */
	val(): FindNestedReadTypeFromFullPath<T, U> | null
}
