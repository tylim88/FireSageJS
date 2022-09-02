import { ref, getDatabase } from 'firebase/database'
import { Database, CreateRef } from '../types'
import { isDatabase, isString } from './utils'

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
