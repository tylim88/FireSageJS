import { LimitConstraint, ErrorLimitInvalidNumber } from '../queryConstraints'
import { OriQueryConstraint } from '../alias'

export type Limit = <V extends number>(
	limit: V extends 0
		? ErrorLimitInvalidNumber
		: number extends V
		? V
		: V extends infer R
		? `${R & number}` extends `-${number}` | `${number}.${number}`
			? ErrorLimitInvalidNumber
			: V
		: never // impossible route
) => LimitConstraint

export type LimitCreator = (
	limitClause: (limit: number) => OriQueryConstraint
) => Limit
