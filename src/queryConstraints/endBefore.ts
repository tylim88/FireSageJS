import { endBefore as endBefore_ } from 'firebase/database'
import { CursorConstraint } from '../types'

// @ts-expect-error
export const endBefore: CursorConstraint = (value, key) => {
	return { ref: endBefore_(value, key) }
}
