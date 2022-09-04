import { startAfter as startAfter_ } from 'firebase/database'
import { StartAfter } from '../types'

// @ts-expect-error
export const startAfter: StartAfter = (value, key?) => {
	return { ref: startAfter_(value, key) }
}
