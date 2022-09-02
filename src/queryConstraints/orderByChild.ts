import { OrderByChild } from '../types'
import { orderByChild as orderByChild_ } from 'firebase/database'

// @ts-expect-error
export const orderByChild: OrderByChild = path => {
	return {
		type: 'orderByChild',
		value: path,
		ref: orderByChild_(path),
	}
}
