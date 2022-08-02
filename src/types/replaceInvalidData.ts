import { ErrorInvalidData } from './error'

export type ReplaceInvalidData<T> = T extends boolean | string | number
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidData<T[K]> }
	: ErrorInvalidData<T extends string ? T : 'root'>
