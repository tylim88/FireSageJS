import { ref } from 'firebase/database'
import {
	MetaType,
	Database,
	DatabaseReference,
	ReplaceInvalidLastSegment,
} from '../types'
import { isDatabase, isString } from '../utils'

export const refCreator =
	<T extends MetaType>(database: Database): Ref<T> =>
	// @ts-expect-error
	(db?: Database, path?: string) => {
		const db_ = isDatabase(db) ? db : database
		const path_ = isString(db) ? db : path
		return ref(db_, path_) as DatabaseReference<T, any>
	}

type Ref<T extends MetaType> = {
	<U extends (keyof T['flatten_write'] & string) | undefined = undefined>(
		path?: U extends keyof T['flatten_write'] & string
			? ReplaceInvalidLastSegment<T, U>
			: U
	): DatabaseReference<T, U>
	<U extends (keyof T['flatten_write'] & string) | undefined = undefined>(
		db?: Database,
		path?: U extends keyof T['flatten_write'] & string
			? ReplaceInvalidLastSegment<T, U>
			: U
	): DatabaseReference<T, U>
}
