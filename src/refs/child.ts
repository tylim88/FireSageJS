import { child } from 'firebase/database'
import {
	MetaType,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
} from '../types'
export const childCreator =
	<T extends MetaType>() =>
	<
		//  eslint-disable-next-line @typescript-eslint/no-explicit-any
		S extends DatabaseReference<T, any>,
		U extends S extends DatabaseReference<T, infer Y>
			? FindAllChildKeys<T, Y> extends never
				? ErrorHasNoChild
				: FindAllChildKeys<T, Y>
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
