import { ref } from 'firebase/database'
import { MetaType, Database, DatabaseReference, RemoveRootName } from '../types'

export const refCreator =
	<T extends MetaType>(db: Database) =>
	<
		U extends
			| T['rootName']
			| `${T['rootName']}/${keyof T['flattenRoot'] & string}`
	>(
		path?: U
	) => {
		return ref(db, path) as DatabaseReference<T, RemoveRootName<T, U>>
	}
