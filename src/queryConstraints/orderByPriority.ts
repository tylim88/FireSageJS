import { OrderBy } from '../types'
import { orderByPriority as orderByPriority_ } from 'firebase/database'

/**
Creates a new QueryConstraint that orders by priority.

Applications need not use priority but can order collections by ordinary properties (see [Sort data](https://firebase.google.com/docs/database/web/lists-of-data#sort_data) for alternatives to priority.
 */
export const orderByPriority = () => {
	return {
		type: 'orderByPriority',
		ref: orderByPriority_(),
		value: undefined,
	} as OrderBy<'orderByPriority', undefined>
}
