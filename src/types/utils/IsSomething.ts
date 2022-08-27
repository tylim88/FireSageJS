import { MetaType } from '../metaType'
import { DatabaseReference } from '../refs'
import {
	FindNestedWriteTypeFromFullPath,
	FindParentNestedWriteTypeFromFullPath,
} from '../utils'

export type IsRecordOrArray<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	E extends string
> = FindNestedWriteTypeFromFullPath<T, U> extends Record<string, unknown>
	? FindNestedWriteTypeFromFullPath<T, U> extends Record<infer X, unknown>
		? string extends X
			? DatabaseReference<T, U>
			: `${number}` extends X
			? DatabaseReference<T, U>
			: E
		: never
	: Extract<FindNestedWriteTypeFromFullPath<T, U>, unknown[]> extends never
	? E
	: DatabaseReference<T, U>

export type IsParentRecordOrArray<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	E extends string
> = FindParentNestedWriteTypeFromFullPath<T, U> extends Record<string, unknown>
	? FindParentNestedWriteTypeFromFullPath<T, U> extends Record<infer X, unknown>
		? string extends X
			? DatabaseReference<T, U>
			: `${number}` extends X
			? DatabaseReference<T, U>
			: E
		: never
	: Extract<
			FindParentNestedWriteTypeFromFullPath<T, U>,
			unknown[]
	  > extends never
	? E
	: DatabaseReference<T, U>

type InvalidKey = '.' | '#' | '$' | '/' | '[' | ']'

export type IsValidKey<
	T extends string,
	E extends InvalidKey = never,
	ACC extends string = T
> = T extends ''
	? false
	: ACC extends `${infer H}${infer R}`
	? H extends Exclude<InvalidKey, E>
		? false
		: IsValidKey<T, E, R>
	: ACC extends ''
	? true
	: false
