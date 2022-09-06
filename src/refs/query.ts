import { query as query_ } from 'firebase/database'
import { Query_ } from '../types'

/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
// @ts-expect-error
export const query: Query_ = (query, ...queryConstraint) => {
	return query_(
		// @ts-expect-error
		query,
		...queryConstraint.map(
			item =>
				// @ts-expect-error
				item.ref
		)
	)
}
