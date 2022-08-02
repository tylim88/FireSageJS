import { OriDatabase, OriFirestoreTesting, Database } from './types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<OriDatabase>
	const e = value as Partial<OriFirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	const v = value as Partial<OriDatabase>
	return typeof v === 'string'
}
