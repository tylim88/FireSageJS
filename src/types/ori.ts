import { Database, DataSnapshot } from 'firebase/database'
import { RulesTestContext } from '@firebase/rules-unit-testing'

export type OriDatabase = Database
export type OriFirestoreTesting = ReturnType<RulesTestContext['database']>
export type OriDocumentSnapshot = DataSnapshot
