import { MetaType } from '../metaType'
import { ErrorHasNoChild } from '../error'
import {
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
	ErrorNeedNumericKey,
	ErrorNoEmptyString,
} from './error'
import { FindMetaPathType, FindAllLevelChildKeys } from './findTypeAndKey'
import { IsNumericRecordType } from '../tsUtils'
import { GetFullPath } from './getPath'

export type ValidateChildPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	ChildPath extends string,
	ErrorINN = ErrorInvalidOrNeedNumericKey,
	ErrorNS = ErrorNeedStringKey,
	ErrorNE = ErrorNoEmptyString
> = FindAllLevelChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: ValidateFullPath<
			T,
			GetFullPath<T, U, ChildPath>,
			GetFullPath<T, U, ChildPath>,
			ErrorINN,
			ErrorNS,
			ErrorNE
	  > extends ErrorNS
	? ErrorNS
	: ValidateFullPath<
			T,
			GetFullPath<T, U, ChildPath>,
			GetFullPath<T, U, ChildPath>,
			ErrorINN,
			ErrorNS,
			ErrorNE
	  > extends ErrorINN
	? ErrorINN
	: ValidateFullPath<
			T,
			GetFullPath<T, U, ChildPath>,
			GetFullPath<T, U, ChildPath>,
			ErrorINN,
			ErrorNS,
			ErrorNE
	  > extends ErrorNE
	? ErrorNE
	: ChildPath

// string does not extends `${number}`
// `${number}` extends string
// if the path segment type is string and the input segment type is number, fail it
// if the path segment type is number and the input segment type is string, fail it (with less specific message because of some technical difficulty)
export type ValidateFullPath<
	T extends MetaType,
	V extends keyof T['flatten_write'] & string,
	Pass = V,
	ErrorINN = ErrorInvalidOrNeedNumericKey,
	ErrorNS = ErrorNeedStringKey,
	ErrorNE = ErrorNoEmptyString,
	L extends string = FindMetaPathType<T, V> & string,
	H extends string = V
> = V extends ''
	? ErrorNE
	: L[] extends never[]
	? ErrorINN // return less specific error for string does not extends `${number}` case
	: L extends `${infer M}/${infer N}` // ! distribution in this line
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

// Record<string, any> and Record<number, any> extends each other
// Record<string, any> does not extends Record<number, any> & Record<string, never>
// Record<number, any> does not extends Record<number, any> & Record<string, never>
// case 1: if the node type is not Record<number, any> OR input type is other than Record<string, any>, don't change the node type
// case 2: if the node type is Record<number, any> AND the input type is Record<string, any>, return error message
export type ValidateRecordString<Input, Node> =
	IsNumericRecordType<Input> extends infer G
		? G extends true // case 1
			? Node
			: Node extends Record<number, unknown> // case 2
			? IsNumericRecordType<Node> extends true
				? ErrorNeedNumericKey
				: Node
			: Node
		: never
