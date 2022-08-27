import { equalTo as equalTo_ } from 'firebase/database'
import { CursorConstraint } from '../types'

// @ts-expect-error
export const equalTo: CursorConstraint = (value, key?) => {
	return { ref: equalTo_(value, key) }
}
