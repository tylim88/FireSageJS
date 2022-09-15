import { ref } from 'firebase/database'
import { CreateRef } from '../types'

/**
 * @param database - Is the database instance to obtain a reference for. If not provided will use the default instance; If provided, the provided will become default instead(for this ref only).
 * @returns ref, similar to the original RTDB V9 ref.
 */
export const createRef: CreateRef =
	database =>
	// @ts-expect-error
	(path?: string) => {
		return ref(
			// @ts-expect-error
			database,
			path
		)
	}
