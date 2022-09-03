import { MetaType } from '../../metaType'
import {
	AllQueryConstraints,
	AllOrderByConstraints,
	AllCursorConstraints,
} from '../queryConstraint'
import { IsTuple } from '../../tsUtils'
import { ErrorQueryConstraintsIsNotTuple } from './error'
import { ValidateOrderByChildren, GetAllOrderByType } from './orderBy'
import { ValidateCursor } from './cursor'

export type ValidateQueryConstraints<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	QC extends AllQueryConstraints[],
	ACC extends unknown[] = [],
	OriQC extends AllQueryConstraints[] = QC
> = IsTuple<OriQC> extends false
	? [ErrorQueryConstraintsIsNotTuple]
	: GetAllOrderByType<OriQC> extends infer O extends AllOrderByConstraints[]
	? QC extends [infer H, ...infer R extends AllQueryConstraints[]]
		? ValidateQueryConstraints<
				T,
				U,
				R,
				[
					...ACC,
					H extends AllOrderByConstraints
						? ValidateOrderByChildren<T, U, O, H>
						: H extends AllCursorConstraints
						? ValidateCursor<T, U, O, H>
						: H
				],
				OriQC
		  >
		: ACC
	: never // impossible route
