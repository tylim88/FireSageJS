import { ref, getDatabase } from 'firebase/database'
import { MetaType, Database, DatabaseReference, Ref } from '../types'
import { isDatabase, isString } from './utils'

/**
 *
 * @param db optional, the database instance to obtain a reference for. If not provided will use the instance; If provided, the provided will become default instead(for this ref only).
 * @returns ref, similar to the original RTDB V9 ref.
 */
export const createRef =
	<T extends MetaType>(database?: Database): Ref<T> =>
	// @ts-expect-error
	(db: Database, path?: string) => {
		const db_ = isDatabase(db) ? db : database || getDatabase()
		const path_ = isString(db) ? db : path
		return ref(
			// @ts-expect-error
			db_,
			path_
		) as DatabaseReference<T, any>
	}
