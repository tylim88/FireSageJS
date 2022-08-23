import { LimitToFirst, ErrorLimitInvalidNumber, MetaType } from '../types'
import { limitToFirst as limitToFirst_ } from 'firebase/database'
/**
Creates a new QueryConstraint that if limited to the first specific number of children.

The limitToFirst() method is used to set a maximum number of children to be synced for a given callback. If we set a limit of 100, we will initially only receive up to 100 child_added events. If we have fewer than 100 messages stored in our Database, a child_added event will fire for each message. However, if we have over 100 messages, we will only receive a child_added event for the first 100 ordered messages. As items change, we will receive child_removed events for each item that drops out of the active list so that the total number stays at 100.

You can read more about limitToFirst() in [Filtering data.](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

@param limit — The maximum number of nodes to include in this query.
 */
export const limitToFirst = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends number
>(
	limit: V extends 0
		? ErrorLimitInvalidNumber
		: number extends V
		? V
		: V extends infer R
		? `${R & number}` extends `-${number}` | `${number}.${number}`
			? ErrorLimitInvalidNumber
			: V
		: never // impossible route
) => {
	return {
		type: 'limitToFirst',
		ref: limitToFirst_(limit),
	} as LimitToFirst<T, U>
}
