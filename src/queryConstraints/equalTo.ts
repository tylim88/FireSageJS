import { equalTo as equalTo_ } from 'firebase/database'
import { EqualTo } from '../types'

// @ts-expect-error
export const equalTo: EqualTo = (value, key?) => {
	return { ref: equalTo_(value, key) }
}
