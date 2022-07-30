import { child } from 'firebase/database'
import { MetaType, Database, DatabaseReference } from '../types'
export const childCreator =
	<T extends MetaType>(parent: DatabaseReference<T, never>) =>
	/** */
	<U extends keyof T['flattenRoot']>(path?: string) => {
		return child(db, path) as DatabaseReference<T, U>
	}
