import { startAt as startAt_ } from 'firebase/database'
import { StartAt } from '../types'

// @ts-expect-error
export const startAt: StartAt = (value, key?) => {
	return { ref: startAt_(value, key) }
}
