import { child as child_ } from 'firebase/database'
import { Child } from '../types'

// @ts-expect-error
export const child: Child = (parent, path) => {
	return child_(parent as any, path)
}
