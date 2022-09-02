import { set as set_ } from 'firebase/database'
import { Set } from '../types'

export const set: Set = (ref, value) => {
	return set_(
		// @ts-expect-error
		ref,
		value
	)
}
