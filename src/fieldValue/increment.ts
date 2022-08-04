import { increment as increment_ } from 'firebase/database'
import { Increment } from '../types'
/**
Returns a placeholder value that can be used to atomically increment the current database value by the provided delta.

@param delta — the amount to modify the current value atomically.

@returns — A placeholder value for modifying data atomically server-side.
 */
export const increment = (delta: number) => {
	return increment_(delta) as Increment
}
