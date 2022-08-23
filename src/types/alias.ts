export type {
	Database,
	ListenOptions,
	Unsubscribe,
	TransactionOptions,
	QueryConstraintType,
	QueryConstraint as OriQueryConstraint,
} from 'firebase/database'
import { RulesTestContext } from '@firebase/rules-unit-testing'

export type FirestoreTesting = ReturnType<RulesTestContext['database']>
