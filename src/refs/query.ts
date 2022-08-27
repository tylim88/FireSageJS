import { query as query_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	QueryConstraint,
	IsValidQueryRef,
	ValidateQueryConstraints,
} from '../types'

/**
Creates a new immutable instance of Query that is extended to also include additional query constraints.

@param query — The Query instance to use as a base for the new constraints.

@param queryConstraints — The list of QueryConstraints to apply.

@throws
if any of the provided query constraints cannot be combined with the existing or new constraints.
 */
export const query = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Q extends QueryConstraint[]
>(
	query: string extends never ? DatabaseReference<T, U> : IsValidQueryRef<T, U>,
	...queryConstraint: Q extends never ? Q : ValidateQueryConstraints<T, U, Q>
) => {
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
