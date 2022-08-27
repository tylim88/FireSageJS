import { endAt as endAt_ } from 'firebase/database'
import { CursorConstraint } from '../types'

/**
(alias) endAt_(value: string | number | boolean | null, key?: string | undefined): QueryConstraint
import endAt_
Creates a QueryConstraint with the specified ending point.

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The ending point is inclusive, so children with exactly the specified value will be included in the query. The optional key argument can be used to further limit the range of the query. If it is specified, then children that have exactly the specified value must also have a key name less than or equal to the specified key.

You can read more about endAt() in [Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param value
The value to end at. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to end at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
// @ts-expect-error
export const endAt: CursorConstraint = (value, key?) => {
	return { ref: endAt_(value, key) }
}
