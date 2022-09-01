import { Database as OriDatabase } from 'firebase/database'
import { RulesTestContext } from '@firebase/rules-unit-testing'
export type {
	ListenOptions,
	Unsubscribe,
	TransactionOptions,
	QueryConstraintType,
	QueryConstraint as OriQueryConstraint,
	DataSnapshot as OriDataSnapshot,
} from 'firebase/database'

export type DatabaseTesting = ReturnType<RulesTestContext['database']>
export type Database = OriDatabase | DatabaseTesting
export type { OriDatabase }
