import { DatabaseReference, Query } from './databaseRef'
import { MetaType } from '../metaType'
import {
	AllQueryConstraints,
	IsValidQueryRef,
	ValidateQueryConstraints,
} from '../queryConstraints'
/**
Creates a new immutable instance of Query that is extended to also include additional query constraints.

@param query — The Query instance to use as a base for the new constraints.

@param queryConstraints — The list of QueryConstraints to apply.

@throws
if any of the provided query constraints cannot be combined with the existing or new constraints.
 */
export type Query_ = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Q extends AllQueryConstraints[]
>(
	query: string extends never ? DatabaseReference<T, U> : IsValidQueryRef<T, U>,
	...queryConstraint: Q extends never ? Q : ValidateQueryConstraints<T, U, Q>
) => Query<T, U>
