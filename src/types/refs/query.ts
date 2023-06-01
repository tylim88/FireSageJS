import { DatabaseReference, Query } from './databaseRef'
import { MetaType } from '../metaType'
import { AllQueryConstraints, IsValidQueryRef } from '../queryConstraints'
import { ValidateQueryConstraints } from '../queryConstraintsLimitations'

export type Query_ = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Q extends AllQueryConstraints[]
>(
	query: string extends never ? DatabaseReference<T, U> : IsValidQueryRef<T, U>,
	...queryConstraint: Q extends never ? Q : ValidateQueryConstraints<T, U, Q>
) => Query<T, U>
