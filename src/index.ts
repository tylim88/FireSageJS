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
	forceLongPolling,
	forceWebSockets,
	off,
	onDisconnect,
} from 'firebase/database'
export * from './fieldValue'
export * from './listeners'
export * from './operations'
export * from './refs'
export * from './runTransaction'
export type {
	ServerTimestamp,
	PushAble as Push,
	Increment,
	MetaTypeCreator,
	DataSnapshot,
	DatabaseReference,
	Query,
} from './types'
