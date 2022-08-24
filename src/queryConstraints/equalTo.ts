import { equalTo as equalTo_ } from 'firebase/database'
import { EqualTo } from '../types'

export const equalTo = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K
) => {
	return { type: 'equalTo', ref: equalTo_(value, key) } as EqualTo<V, K>
}
