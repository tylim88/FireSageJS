import { ref } from 'firebase/database'
import { MetaType, Database, DatabaseReference } from '../types'

export const refCreator =
	<T extends MetaType>(db: Database, rootPath: T['rootPath']) =>
	<U extends (keyof T['flattenRoot'] & string) | undefined>(path?: U) => {
		return ref(db, path) as DatabaseReference<T, U>
	}
