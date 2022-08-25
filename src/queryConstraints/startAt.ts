import { startAt as startAt_ } from 'firebase/database'
import { Cursor } from '../types'

export const startAt = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { ref: startAt_(value, key) } as Cursor<V, K>
}
