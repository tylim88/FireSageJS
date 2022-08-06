import { MetaType } from './metaTypeCreator'
import {
	RemoveLastSegment,
	GetFirstSegment,
	RemoveFirstSegment,
} from './stringManipulation'
import { Push, FireSagePushValue, Remove } from './fieldValue'
import { ErrorNotRemoveAble, ErrorNotPushAble } from './error'

export type Mode = 'read' | 'write' | 'base' | 'compare'

export type FindParentKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? null
		: RemoveLastSegment<U>
	: never

export type FindParentType<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	M extends Mode
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? T[M]
		: FindParentKey<T, U> extends keyof T[`flatten_write`]
		? T[`flatten_write`][FindParentKey<T, U>]
		: never
	: never

export type FindAllChildKeys<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U[] extends undefined[]
	? keyof T['flatten_write'] & string
	: keyof T['flatten_write'] & string extends infer R
	? R extends `${U}/${infer S}`
		? S
		: never
	: never

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flatten_write'] & string) | undefined,
	ChildRelativePath extends string
> = `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flatten_write'] &
	string
	? `${ParentFullPath}/${ChildRelativePath}`
	: ParentFullPath extends undefined
	? ChildRelativePath extends keyof T['flatten_write'] & string
		? ChildRelativePath
		: never
	: never

export type FindNestedTypeFromFullPath<
	T extends MetaType,
	U extends string | undefined,
	M extends Mode,
	ACC extends T[M] = T[M]
> = U extends undefined
	? T[M]
	: U extends `${infer R extends keyof ACC & string}/${infer S}`
	? FindNestedTypeFromFullPath<T, S, M, ACC[R]>
	: U extends keyof ACC
	? ACC[U]
	: never

export type IfIsXAbleThenReturnV<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V,
	X,
	Error extends string,
	ACC extends string | undefined = GetFirstSegment<U>,
	DCC extends string | undefined = RemoveFirstSegment<U>
> = U extends undefined
	? T['base'] extends X
		? V
		: Error
	: DCC extends ''
	? X extends FindNestedTypeFromFullPath<T, ACC, 'base'>
		? V
		: Error
	: IfIsXAbleThenReturnV<
			T,
			U,
			V,
			X,
			Error,
			Push<any>[] extends FindNestedTypeFromFullPath<T, ACC, 'base'>[]
				? `${ACC}/${FireSagePushValue}/${GetFirstSegment<
						RemoveFirstSegment<DCC>
				  >}`
				: `${ACC}/${GetFirstSegment<DCC>}`,
			Push<any>[] extends FindNestedTypeFromFullPath<T, ACC, 'base'>[]
				? RemoveFirstSegment<RemoveFirstSegment<DCC>>
				: RemoveFirstSegment<DCC>
	  >

export type IfIsPushAbleThenReturnV<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> = IfIsXAbleThenReturnV<T, U, V, Push<any>, ErrorNotPushAble<U>>

export type IfIsRemoveAbleThenReturnV<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> = IfIsXAbleThenReturnV<T, U, V, Remove, ErrorNotRemoveAble<U>>
