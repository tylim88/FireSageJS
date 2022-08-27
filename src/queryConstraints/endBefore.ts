import { endBefore as endBefore_ } from 'firebase/database'
import { CursorConstraint } from '../types'
/**
Creates a QueryConstraint with the specified ending point (exclusive).

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The ending point is exclusive. If only a value is provided, children with a value less than the specified value will be included in the query. If a key is specified, then children must have a value less than or equal to the specified value and a a key name less than the specified key.

@param value
The value to end before. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to end before, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
// @ts-expect-error
export const endBefore: CursorConstraint = (value, key) => {
	return { ref: endBefore_(value, key) }
}
// ! jsdoc typo
