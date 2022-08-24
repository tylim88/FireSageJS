import { startAt as startAt_ } from 'firebase/database'
import { StartAt } from '../types'

export const startAt = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { type: 'startAt', ref: startAt_(value, key) } as StartAt<V, K>
}
