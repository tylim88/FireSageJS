import { MetaType } from './metaTypeCreator'
import {
	RemoveLastSegment,
	GetFirstSegment,
	RemoveFirstSegment,
} from './stringManipulation'
import { Push, FireSagePushValue } from './fieldValue'
import { ErrorNotPushAble } from './error'

export type Mode = 'read' | 'write' | 'base'

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

export type FindType<
	T extends MetaType,
	U extends string | undefined,
	M extends Mode,
	ACC extends T[`flatten_${M}`] = T[M]
> = U extends undefined
	? T[M]
	: U extends `${infer R extends keyof ACC & string}/${infer S}`
	? FindType<T, S, M, ACC[R]>
	: U extends keyof ACC
	? ACC[U]
	: never

export type IfIsPushReturnV<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V,
	ACC extends string | undefined = GetFirstSegment<U>,
	DCC extends string | undefined = RemoveFirstSegment<U>
> = U extends undefined
	? T['base'] extends Push<any>
		? V
		: ErrorNotPushAble<U>
	: DCC extends ''
	? Push<any> extends FindType<T, ACC, 'base'>
		? V
		: ErrorNotPushAble<U>
	: IfIsPushReturnV<
			T,
			U,
			V,
			Push<any> extends FindType<T, ACC, 'base'>
				? `${ACC}/${FireSagePushValue}/${GetFirstSegment<
						RemoveFirstSegment<DCC>
				  >}`
				: `${ACC}/${GetFirstSegment<DCC>}`,
			FindType<T, ACC, 'base'> extends Push<any>
				? RemoveFirstSegment<RemoveFirstSegment<DCC>>
				: RemoveFirstSegment<DCC>
	  >
