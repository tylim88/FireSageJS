import { Database, FirestoreTesting } from '../types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<Database>
	const e = value as Partial<FirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	return typeof value === 'string'
}
