import { MetaType } from '../metaType'
import {
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
	ErrorNeedNumericKey,
	ErrorNoInValidCharacter,
	ErrorHasNoChild,
	ErrorNeedNoNNumericKey,
} from './error'
import { FindMetaPathType, FindAllLevelChildKeys } from './findTypeAndKey'
import { IsNumericRecordType } from '../tsUtils'
import { IsCharacterValid, IsRecordString } from './isSomething'

export type ValidateChildPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	ChildPath extends string,
	ErrorINN = ErrorInvalidOrNeedNumericKey,
	ErrorNS = ErrorNeedStringKey,
	ErrorNE = ErrorNoInValidCharacter
> = IsCharacterValid<
	ChildPath,
	FindAllLevelChildKeys<T, U> extends never
		? ErrorHasNoChild<U>
		: ValidateFullPath<
				T,
				`${U extends string ? `${U}/` : ''}${ChildPath}`,
				ChildPath,
				ErrorINN,
				ErrorNS,
				ErrorNE
		  >,
	ErrorNE,
	'/'
>

// string does not extends `${number}`
// `${number}` extends string
// if the path segment type is string and the input segment type is number, fail it
// if the path segment type is number and the input segment type is string, fail it (with less specific message because of some technical difficulty)
export type ValidateFullPath<
	T extends MetaType,
	V extends string | undefined,
	Pass = V,
	ErrorINN = ErrorInvalidOrNeedNumericKey,
	ErrorNS = ErrorNeedStringKey,
	ErrorNE = ErrorNoInValidCharacter,
	L extends string | undefined = FindMetaPathType<T, V> & (string | undefined),
	H extends string | undefined = V
> = V extends string
	? IsCharacterValid<V, Pass, ErrorNE, '/'> extends ErrorNE
		? ErrorNE
		: L[] extends never[]
		? ErrorINN // return less specific error for string does not extends `${number}` case
		: L extends `${infer M}/${infer N}`
		? H extends `${infer I}/${infer J}`
			? I extends `${number}`
				? string extends M
					? ErrorNS
					: ValidateFullPath<T, V, Pass, ErrorINN, ErrorNS, ErrorNE, N, J>
				: ValidateFullPath<T, V, Pass, ErrorINN, ErrorNS, ErrorNE, N, J>
			: never // impossible route
		: H extends `${number}`
		? string extends L
			? ErrorNS
			: Pass
		: Pass
	: L extends undefined
	? V
	: ErrorINN

// Record<string, T> and Record<number, T> extends each other
// Record<string, T> does not extends Record<number, T> & Record<string, never>
// Record<number, T> does not extends Record<number, T> & Record<string, never>
// case 1: if the node type is not Record<number, T> OR input type is other than Record<string, T>, don't change the node type
// case 2: if the node type is Record<string, T> AND input type is Record<number, T>, return error message
// case 3: if the node type is Record<number, T> AND the input type is Record<string, T>, return error message
export type ValidateRecordStringNumber<Input, Node> =
	IsNumericRecordType<Input> extends infer G
		? G extends true
			? IsRecordString<
					Node,
					ErrorNeedNoNNumericKey, // case 2
					Node // case 1
			  >
			: Node extends Record<number, unknown>
			? IsNumericRecordType<Node> extends true
				? Input extends Record<string, unknown>
					? ErrorNeedNumericKey // case 3
					: Node
				: Node
			: Node
		: never
