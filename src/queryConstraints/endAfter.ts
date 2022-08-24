import { endBefore as endBefore_ } from 'firebase/database'
import { EndBefore } from '../types'

export const endBefore = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { type: 'endBefore', ref: endBefore_(value, key) } as EndBefore<V, K>
}
