import { ref } from 'firebase/database'
import { MetaType, Database, DatabaseReference } from '../types'
import { isDatabase } from '../utils'

export const refCreator =
	<T extends MetaType>(database: Database): Ref<T> =>
	(db?: Database, path?: string) => {
		const db_ = isDatabase(db) ? db : database
		return ref(db_, path) as DatabaseReference<
			T,
			//  eslint-disable-next-line @typescript-eslint/no-explicit-any
			any
		>
	}

type Ref<T extends MetaType> = {
	<U extends (keyof T['flattenRoot'] & string) | undefined = undefined>(
		path?: U
	): DatabaseReference<T, U>
	<U extends (keyof T['flattenRoot'] & string) | undefined = undefined>(
		db?: Database,
		path?: U
	): DatabaseReference<T, U>
}
