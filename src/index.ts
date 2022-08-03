import { getDatabase } from 'firebase/database'
import { Database, MetaType } from './types'
import { refCreator } from './refs'

export const getFiresage =
	<T extends MetaType>(db?: Database) =>
	() => {
		const DB = db || getDatabase()
		return {
			ref: refCreator<T>(DB),
		}
	}

export {
	getDatabase,
	connectDatabaseEmulator,
	enableLogging,
	goOffline,
	goOnline,
} from 'firebase/database'
