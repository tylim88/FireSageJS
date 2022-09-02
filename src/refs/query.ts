import { query as query_ } from 'firebase/database'
import { Query_ } from '../types'

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
