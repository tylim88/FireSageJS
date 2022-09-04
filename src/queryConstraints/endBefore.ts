import { endBefore as endBefore_ } from 'firebase/database'
import { EndBefore } from '../types'

// @ts-expect-error
export const endBefore: EndBefore = (value, key) => {
	return { ref: endBefore_(value, key) }
}
