import { endAt as endAt_ } from 'firebase/database'
import { Cursor } from '../types'

export const endAt = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { ref: endAt_(value, key) } as Cursor<V, K>
}
