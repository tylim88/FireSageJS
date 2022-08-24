import { MetaType, OrderByValue } from '../types'
import { orderByValue as orderByValue_ } from 'firebase/database'

/**
Creates a new QueryConstraint that orders by value.

If the children of a query are all scalar values (string, number, or boolean), you can order the results by their (ascending) values.

You can read more about orderByValue() in [Sort data](https://firebase.google.com/docs/database/web/lists-of-data#sort_data).
 */
export const orderByValue = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>() => {
	return { type: 'orderByValue', ref: orderByValue_() } as OrderByValue
}
