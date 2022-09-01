import { Database, DatabaseTesting, OriDatabase } from '../types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<OriDatabase>
	const e = value as Partial<DatabaseTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	return typeof value === 'string'
}
