import { OrderBy } from '../types'
import { orderByKey as orderByKey_ } from 'firebase/database'

/**
Creates a new QueryConstraint that orders by the key.

Sorts the results of a query by their (ascending) key values.

You can read more about orderByKey() in [Sort data](https://firebase.google.com/docs/database/web/lists-of-data#sort_data).

@param path — The path to order by.
 */
export const orderByKey = () => {
	return {
		type: 'orderByKey',
		ref: orderByKey_(),
		value: undefined,
	} as OrderBy<'orderByKey', undefined>
}
