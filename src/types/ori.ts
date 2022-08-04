import {
	Database,
	DataSnapshot,
	ListenOptions,
	Unsubscribe,
	TransactionOptions,
} from 'firebase/database'
import { RulesTestContext } from '@firebase/rules-unit-testing'

export type OriDatabase = Database
export type OriFirestoreTesting = ReturnType<RulesTestContext['database']>
export type OriDocumentSnapshot = DataSnapshot
export type OriListenOptions = ListenOptions
export type OriUnsubscribe = Unsubscribe
export type OriTransactionOptions = TransactionOptions
