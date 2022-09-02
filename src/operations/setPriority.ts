import { setPriority as setPriority_ } from 'firebase/database'
import { SetPriority } from '../types'

// internal use only
export const setPriority: SetPriority = (ref, priority) => {
	return setPriority_(
		// @ts-expect-error
		ref,
		priority
	)
}
