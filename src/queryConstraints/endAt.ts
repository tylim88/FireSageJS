import { endAt as endAt_ } from 'firebase/database'
import { EndAt } from '../types'

// @ts-expect-error
export const endAt: EndAt = (value, key?) => {
	return { ref: endAt_(value, key) }
}
