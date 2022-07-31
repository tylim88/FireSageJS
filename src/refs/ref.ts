import { ref } from 'firebase/database'
import { MetaType, Database, DatabaseReference, RemoveRootName } from '../types'
export const refCreator =
	<T extends MetaType>(db: Database) =>
	<U extends `${T['rootName']}/${keyof T['flattenRoot'] & string}`>(
		path?: U extends never
			? U
			: T['rootName'] | `${T['rootName']}/${T['flattenRoot'] & string}`
	) => {
		return ref(db, path) as DatabaseReference<T, RemoveRootName<T, U>>
	}
