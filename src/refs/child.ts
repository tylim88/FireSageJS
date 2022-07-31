import { child } from 'firebase/database'
import { MetaType, DatabaseReference, FindAllChildKeys } from '../types'
export const childCreator =
	<T extends MetaType>() =>
	<
		S extends DatabaseReference<T, keyof T['flattenRoot'] & string>,
		U extends S extends DatabaseReference<T, infer Y>
			? FindAllChildKeys<T, Y>
			: never
	>(
		parent: S,
		path: U
	) => {
		return child(parent, path) as DatabaseReference<
			T,
			S extends DatabaseReference<T, infer Y>
				? `${Y}/${U}` & keyof T['flattenRoot'] & string
				: never
		>
	}
