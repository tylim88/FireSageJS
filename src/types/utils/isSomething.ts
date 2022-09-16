import { MetaType } from '../metaType'
import { DatabaseReference } from '../refs'
import {
	FindNestedWriteTypeFromFullPath,
	FindParentNestedWriteTypeFromFullPath,
} from '.'
import { ErrorNoInValidCharacter } from './error'

export type IsRecordOrArray<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	E extends string,
	Pass = DatabaseReference<T, U>
> = FindNestedWriteTypeFromFullPath<T, U> extends Record<string, unknown>
	? FindNestedWriteTypeFromFullPath<T, U> extends Record<infer X, unknown>
		? string extends X
			? Pass
			: `${number}` extends X
			? Pass
			: E
		: never
	: Extract<FindNestedWriteTypeFromFullPath<T, U>, unknown[]> extends never
	? E
	: Pass

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

type InvalidCharacter = '.' | '#' | '$' | '/' | '[' | ']'

export type IsCharacterValid<
	V extends string,
	PASS = V,
	FAIL = ErrorNoInValidCharacter,
	E extends InvalidCharacter = never,
	ACC extends string = V
> = string extends V
	? PASS
	: V extends ''
	? FAIL
	: ACC extends `${infer H}${infer R}`
	? H extends Exclude<InvalidCharacter, E>
		? FAIL
		: IsCharacterValid<V, PASS, FAIL, E, R>
	: ACC extends ''
	? PASS
	: string extends ACC
	? PASS
	: FAIL

export type IsRecordString<T, PASS = true, FAIL = false> = T extends Record<
	infer X,
	unknown
>
	? string extends X
		? PASS
		: FAIL
	: never // impossible route
