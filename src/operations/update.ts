import { update as update_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	GetFullPath,
	UpdateValuesLoopCheck,
} from '../types'

// TODO research the 2 dimensions tuple inference issue, check old commit
export const update = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends ('a' | 'b' | 'c' extends infer R ? [R, unknown] : never)[]
>(
	ref: DatabaseReference<T, U>,
	...values: V // extends never ? V : UpdateValuesLoopCheck<T, U, V>
) => {
	const obj: Record<string, unknown> = {}

	;(values as [string, unknown][]).forEach(item => {
		obj[item[0]] = item[1]
	})

	return update_(ref as any, obj)
}
