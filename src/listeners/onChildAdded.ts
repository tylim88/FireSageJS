import { onChildAdded as onChildAdded_ } from 'firebase/database'
import { OnChildAdded } from '../types'
import { listenerCreator } from './utils'

export const onChildAdded: OnChildAdded = (
	query,
	callback,
	cancelCallback,
	options?
) => {
	return listenerCreator(
		onChildAdded_,
		// @ts-expect-error
		query,
		callback,
		cancelCallback,
		options
	)
}
