import { setPriority as setPriority_ } from 'firebase/database'
import { SetPriority } from '../types'

/**
 * Sets a priority for the data at this Database location.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */
export const setPriority: SetPriority = (ref, priority) => {
	return setPriority_(
		// @ts-expect-error
		ref,
		priority
	)
}
// internal use only
