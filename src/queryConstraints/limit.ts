import {
	LimitConstraint,
	LimitCreator,
	LimitToFirst,
	LimitToLast,
} from '../types'
import {
	limitToFirst as limitToFirst_,
	limitToLast as limitToLast_,
} from 'firebase/database'

const limitCreator: LimitCreator = limitClause => limit => {
	return {
		ref: limitClause(limit),
	} as LimitConstraint
}

export const limitToFirst: LimitToFirst = limitCreator(limitToFirst_)

export const limitToLast: LimitToLast = limitCreator(limitToLast_)
