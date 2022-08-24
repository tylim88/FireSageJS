import { startAfter as startAfter_ } from 'firebase/database'
import { StartAfter } from '../types'

export const startAfter = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { type: 'startAfter', ref: startAfter_(value, key) } as StartAfter<
		V,
		K
	>
}
