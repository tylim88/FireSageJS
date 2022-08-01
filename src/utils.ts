import { OriDatabase, OriFirestoreTesting, Database } from './types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<OriDatabase>
	const e = value as Partial<OriFirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}
