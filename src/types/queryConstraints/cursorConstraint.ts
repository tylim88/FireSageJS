import { ErrorInvalidFirebaseKey, ErrorInvalidCursorValue } from './error'
import { CursorConstraint, CursorTypes } from './queryConstraint'
import { IsCharacterValid } from '../utils'

export type CursorValue = string | boolean | number | null
// First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.
// Second argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string or optional.
// Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
export type Cursor<T extends CursorTypes> = <V, K extends string = never>(
	value: V extends CursorValue ? V : ErrorInvalidCursorValue,
	key?: K extends never ? K : IsCharacterValid<K, K, ErrorInvalidFirebaseKey>
) => CursorConstraint<T, V, K>

/**
Creates a QueryConstraint with the specified ending point.

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The ending point is inclusive, so children with exactly the specified value will be included in the query. The optional key argument can be used to further limit the range of the query. If it is specified, then children that have exactly the specified value must also have a key name less than or equal to the specified key.

You can read more about endAt() in [Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param value
The value to end at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to end at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
export type EndAt = Cursor<'endAt'>
/**
Creates a QueryConstraint with the specified ending point (exclusive).

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The ending point is exclusive. If only a value is provided, children with a value less than the specified value will be included in the query. If a key is specified, then children must have a value less than or equal to the specified value and a a key name less than the specified key.

@param value
The value to end before. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to end before, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
export type EndBefore = Cursor<'endBefore'>
/**
Creates a QueryConstraint with the specified starting point.

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The starting point is inclusive, so children with exactly the specified value will be included in the query. The optional key argument can be used to further limit the range of the query. If it is specified, then children that have exactly the specified value must also have a key name greater than or equal to the specified key.

You can read more about startAt() in [Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param value
The value to start at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to start at. This argument is only allowed if ordering by child, value, or priority.
 */
export type StartAt = Cursor<'startAt'>
/**
Creates a QueryConstraint with the specified starting point (exclusive).

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The starting point is exclusive. If only a value is provided, children with a value greater than the specified value will be included in the query. If a key is specified, then children must have a value greater than or equal to the specified value and a a key name greater than the specified key.

@param value
The value to start after. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to start after. This argument is only allowed if ordering by child, value, or priority.
 */
export type StartAfter = Cursor<'startAfter'>
/**
Creates a QueryConstraint that includes children that match the specified value.

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The optional key argument can be used to further limit the range of the query. If it is specified, then children that have exactly the specified value must also have exactly the specified key as their key name. This can be used to filter result sets with many matches for the same value.

You can read more about equalTo() in [Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param value
The value to match for. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to start at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
export type EqualTo = Cursor<'equalTo'>
