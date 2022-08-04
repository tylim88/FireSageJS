import { ref } from 'firebase/database'
import { MetaType, Database, DatabaseReference } from '../types'
import { isDatabase, isString } from '../utils'

export const refCreator =
	<T extends MetaType>(database: Database): Ref<T> =>
	(db?: Database, path?: string) => {
		const db_ = isDatabase(db) ? db : database
		const path_ = isString(db) ? db : path
		return ref(db_, path_) as DatabaseReference<
			T,
			//  eslint-disable-next-line @typescript-eslint/no-explicit-any
			any
		>
	}

type Ref<T extends MetaType> = {
	<U extends (keyof T['flatten_base'] & string) | undefined = undefined>(
		path?: U
	): DatabaseReference<T, U>
	<U extends (keyof T['flatten_base'] & string) | undefined = undefined>(
		db?: Database,
		path?: U
	): DatabaseReference<T, U>
}
