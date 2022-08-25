import { startAfter as startAfter_ } from 'firebase/database'
import { Cursor } from '../types'

export const startAfter = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { ref: startAfter_(value, key) } as Cursor<V, K>
}
