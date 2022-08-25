import { MetaType } from '../../metaType'
import {
	QueryConstraint,
	CommonOrderBy,
	CommonCursor,
} from '../queryConstraint'
import { IsTuple } from '../../utils'
import { ErrorQueryConstraintsIsNotTuple } from './error'
import { ValidateOrderByChildren, GetAllOrderByType } from './orderBy'
import { ValidateCursor } from './cursor'

export type ValidateQueryConstraints<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	QC extends QueryConstraint[],
	ACC extends unknown[] = []
> = IsTuple<QC> extends false
	? ErrorQueryConstraintsIsNotTuple
	: GetAllOrderByType<QC> extends infer O extends CommonOrderBy[]
	? QC extends [infer H, ...infer R extends QueryConstraint[]]
		? ValidateQueryConstraints<
				T,
				U,
				R,
				[
					...ACC,
					H extends CommonOrderBy
						? ValidateOrderByChildren<T, U, O, H>
						: H extends CommonCursor
						? ValidateCursor<T, U, O, H>
						: H
				]
		  >
		: ACC
	: never // impossible route
