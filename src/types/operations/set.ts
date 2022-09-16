import { MetaType } from '../metaType'
import { ErrorIsPushOnlyAbleType } from './error'
import {
	GetAllPushAbleOnlyPaths,
	ValidateRecordStringNumber,
	FindNestedWriteTypeFromFullPath,
} from '../utils'
import { DatabaseReference } from '../refs'

export type IsValidSetValue<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
> = ValidateRecordStringNumber<V, FindNestedWriteTypeFromFullPath<T, U>>

export type IsValidSetRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends GetAllPushAbleOnlyPaths<T>
	? ErrorIsPushOnlyAbleType<U>
	: DatabaseReference<T, U>

export type Set = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	R extends DatabaseReference<T, U>,
	V
>(
	ref: R extends never ? R : IsValidSetRef<T, U>,
	value: V extends never ? V : IsValidSetValue<T, U, V>
) => Promise<void>
// ! If you change this, change also onDisconnect set
