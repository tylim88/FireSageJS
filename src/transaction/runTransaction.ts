import { runTransaction as runTransaction_ } from 'firebase/database'
import { DatabaseReference, MetaType } from '../types'

export const runTransaction = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U>
) => {
	return runTransaction_
}
