import { query as query_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	QueryConstraint,
	IsValidQueryRef,
	ErrorQueryConstraintsMustBeTuple,
	IsTuple,
} from '../types'

/**
Creates a new immutable instance of Query that is extended to also include additional query constraints.

@param query — The Query instance to use as a base for the new constraints.

@param queryConstraints — The list of QueryConstraints to apply.

@throws
if any of the provided query constraints cannot be combined with the existing or new constraints.
 */
export const query = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	query: string extends never ? DatabaseReference<T, U> : IsValidQueryRef<T, U>,
	...queryConstraint: QueryConstraint<T, U>[]
) => {
	return query_(
		// @ts-expect-error
		query,
		...queryConstraint.map(item => item.ref)
	)
}

// import { query as query_ } from 'firebase/database'
// import {
// 	DatabaseReference,
// 	MetaType,
// 	QueryConstraint,
// 	IsValidQueryRef,
// 	ErrorQueryConstraintsMustBeTuple,
// 	IsTuple,
// } from '../types'

// /**
// Creates a new immutable instance of Query that is extended to also include additional query constraints.

// @param query — The Query instance to use as a base for the new constraints.

// @param queryConstraints — The list of QueryConstraints to apply.

// @throws
// if any of the provided query constraints cannot be combined with the existing or new constraints.
//  */
// export const query = <
// 	S extends DatabaseReference<any, any>,
// 	T extends S extends DatabaseReference<infer X, any> ? X : never,
// 	U extends S extends DatabaseReference<any, infer X> ? X : never,
// 	V extends QueryConstraint<T, U>[]
// >(
// 	query: S extends never ? S : IsValidQueryRef<T, U>,
// 	...queryConstraint: V extends never
// 		? V
// 		: IsTuple<V> extends true
// 		? V
// 		: [ErrorQueryConstraintsMustBeTuple]
// ) => {
// 	return query_(
// 		// @ts-expect-error
// 		query,
// 		...queryConstraint
// 	)
// }
