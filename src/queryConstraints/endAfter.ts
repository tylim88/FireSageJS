import { endBefore as endBefore_ } from 'firebase/database'
import { Cursor } from '../types'

export const endBefore = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { ref: endBefore_(value, key) } as Cursor<V, K>
}
