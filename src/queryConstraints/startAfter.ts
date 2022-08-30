import { startAfter as startAfter_ } from 'firebase/database'
import { CursorConstraint } from '../types'

/**
Creates a QueryConstraint with the specified starting point (exclusive).

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The starting point is exclusive. If only a value is provided, children with a value greater than the specified value will be included in the query. If a key is specified, then children must have a value greater than or equal to the specified value and a a key name greater than the specified key.

@param value
The value to start after. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to start after. This argument is only allowed if ordering by child, value, or priority.
 */
// @ts-expect-error
export const startAfter: CursorConstraint = (value, key?) => {
	return { ref: startAfter_(value, key) }
}
