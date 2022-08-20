import { Database, FirestoreTesting, ListenOptions } from './types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<Database>
	const e = value as Partial<FirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	const v = value as Partial<Database>
	return typeof v === 'string'
}

export const isOptions = (
	arg: ((error: Error) => unknown) | (() => void) | ListenOptions | undefined
): arg is ListenOptions => {
	const v = arg as Partial<ListenOptions>
	return v?.onlyOnce !== undefined // onlyOnce is boolean, so check for undefined
}
