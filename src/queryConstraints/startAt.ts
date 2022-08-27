import { startAt as startAt_ } from 'firebase/database'
import { CursorConstraint } from '../types'

// @ts-expect-error
export const startAt: CursorConstraint = (value, key?) => {
	return { ref: startAt_(value, key) }
}
