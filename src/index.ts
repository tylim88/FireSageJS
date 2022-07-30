import { getDatabase } from 'firebase/database'
import { Database } from './types'

export const getFiresage = (db?: Database) => {
	const DB = db || getDatabase()
	return {}
}

export {
	getDatabase,
	connectDatabaseEmulator,
	enableLogging,
	goOffline,
	goOnline,
} from 'firebase/database'
