import { update as update_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	GetFullPath,
	UpdateValuesLoopCheck,
} from '../types'

export const update = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends (FindAllChildKeys<T, U> extends infer R
		? R extends string
			? [R, FindNestedTypeFromFullPath<T, GetFullPath<T, U, R>, 'write'>]
			: never
		: never)[]
>(
	ref: DatabaseReference<T, U>,
	...values: V extends never ? V : UpdateValuesLoopCheck<T, U, V>
) => {
	const obj: Record<string, unknown> = {}

	;(values as [string, unknown][]).forEach(item => {
		obj[item[0]] = item[1]
	})

	return update_(ref as any, obj)
}
