import { runTransaction as runTransaction_ } from 'firebase/database'
import { RunTransaction } from '../types'

// @ts-expect-error
export const runTransaction: RunTransaction = (
	ref,
	transactionUpdate,
	options
) => {
	return runTransaction_(ref, transactionUpdate, options)
}
