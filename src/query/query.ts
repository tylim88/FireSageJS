import { query as query_ } from 'firebase/database'
import { Query, MetaType } from '../types'
export const query = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: Query<T, U>
) => {
	return query_(query)
}
