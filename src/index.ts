import { getDatabase } from 'firebase/database'
import { Database, MetaType } from './types'
import { refCreator, childCreator } from './refs'

export const getFiresage =
	<T extends MetaType>(db?: Database) =>
	() => {
		const DB = db || getDatabase()
		return {
			ref: refCreator<T>(DB),
			child: childCreator<T>(),
		}
	}

export {
	getDatabase,
	connectDatabaseEmulator,
	enableLogging,
	goOffline,
	goOnline,
} from 'firebase/database'
