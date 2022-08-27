import { equalTo as equalTo_ } from 'firebase/database'
import { CursorConstraint } from '../types'
/**
(alias) equalTo_(value: string | number | boolean | null, key?: string | undefined): QueryConstraint
import equalTo_
Creates a QueryConstraint that includes children that match the specified value.

Using startAt(), startAfter(), endBefore(), endAt() and equalTo() allows you to choose arbitrary starting and ending points for your queries.

The optional key argument can be used to further limit the range of the query. If it is specified, then children that have exactly the specified value must also have exactly the specified key as their key name. This can be used to filter result sets with many matches for the same value.

You can read more about equalTo() in [Filtering Data](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param value
The value to match for. The argument type depends on which orderBy*() function was used in this query. Specify a value that matches the orderBy*() type. When used in combination with orderByKey(), the value must be a string.

@param key
The child key to start at, among the children with the previously specified priority. This argument is only allowed if ordering by child, value, or priority.
 */
// @ts-expect-error
export const equalTo: CursorConstraint = (value, key?) => {
	return { ref: equalTo_(value, key) }
}
