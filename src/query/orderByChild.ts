import { orderByChild as orderByChild_ } from 'firebase/database'

export const orderByChild = (path: string) => {
	return orderByChild_(path)
}
