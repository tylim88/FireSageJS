import { endAt as endAt_ } from 'firebase/database'
import { CursorConstraint } from '../types'

// @ts-expect-error
export const endAt: CursorConstraint = (value, key?) => {
	return { ref: endAt_(value, key) }
}
