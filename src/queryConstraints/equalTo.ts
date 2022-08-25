import { equalTo as equalTo_ } from 'firebase/database'
import { Cursor } from '../types'

export const equalTo = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { ref: equalTo_(value, key) } as Cursor<V, K>
}
