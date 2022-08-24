import { endAt as endAt_ } from 'firebase/database'
import { EndAt } from '../types'

export const endAt = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { type: 'endAt', ref: endAt_(value, key) } as EndAt<V, K>
}
