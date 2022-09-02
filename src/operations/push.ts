import { push as push_ } from 'firebase/database'
import { Push } from '../types'

// @ts-expect-error
export const push: Push = (ref, value) => {
	return push_(
		// @ts-expect-error
		ref,
		value
	)
}
