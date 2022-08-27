import { startAfter as startAfter_ } from 'firebase/database'
import { CursorConstraint } from '../types'

// @ts-expect-error
export const startAfter: CursorConstraint = (value, key?) => {
	return { ref: startAfter_(value, key) }
}
