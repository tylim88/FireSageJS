import { MetaType } from '../metaType'
import {
	AllQueryConstraints,
	AllOrderByConstraints,
	AllCursorConstraints,
} from '../queryConstraints'
import { IsTuple } from '../tsUtils'
import { ErrorQueryConstraintsIsNotTuple } from './error'
import { ValidateOrderByChildren, GetAllOrderByConstraints } from './orderBy'
import { ValidateCursor, GetAllCursorConstraints } from './cursor'

export type ValidateQueryConstraints<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	QC extends AllQueryConstraints[],
	ACC extends unknown[] = [],
	OriQC extends AllQueryConstraints[] = QC
> = IsTuple<OriQC> extends false
	? [ErrorQueryConstraintsIsNotTuple]
	: GetAllOrderByConstraints<OriQC> extends infer AllOrderBy extends AllOrderByConstraints[]
	? GetAllCursorConstraints<OriQC> extends infer AllCursor extends AllCursorConstraints[]
		? QC extends [infer CurrentCursor, ...infer R extends AllQueryConstraints[]]
			? ValidateQueryConstraints<
					T,
					U,
					R,
					[
						...ACC,
						CurrentCursor extends AllOrderByConstraints
							? ValidateOrderByChildren<T, U, AllOrderBy, CurrentCursor>
							: CurrentCursor extends AllCursorConstraints
							? ValidateCursor<T, U, AllOrderBy, CurrentCursor, AllCursor>
							: CurrentCursor
					],
					OriQC
			  >
			: ACC
		: never // impossible route
	: never // impossible route
