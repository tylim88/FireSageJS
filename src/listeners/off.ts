import { off as off_ } from 'firebase/database'
import { Off } from '../types'

export const off: Off = (query, eventType, callback) => {
	// @ts-expect-error
	return off_(query, eventType, callback)
}
