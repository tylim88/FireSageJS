import { remove as remove_ } from 'firebase/database'
import { Remove } from '../types'

export const remove: Remove = ref => {
	return remove_(
		// @ts-expect-error
		ref
	)
}
