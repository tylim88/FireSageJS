import { ref, getDatabase } from 'firebase/database'
import { Database, CreateRef } from '../types'
import { isDatabase, isString } from './utils'

/**
 * @param db - optional and skippable(function overloading), is the database instance to obtain a reference for. If not provided will use the default instance; If provided, the provided will become default instead(for this ref only).
 * @returns ref, similar to the original RTDB V9 ref.
 */
export const createRef: CreateRef =
	(database?) =>
	// @ts-expect-error
	(db: Database, path?: string) => {
		const db_ = isDatabase(db) ? db : database || getDatabase()
		const path_ = isString(db) ? db : path
		return ref(
			// @ts-expect-error
			db_,
			path_
		)
	}
