import { onChildRemoved as onChildRemoved_ } from 'firebase/database'
import { OnChildRemoved } from '../types'
import { listenerCreator } from './utils'

export const onChildRemoved: OnChildRemoved = (
	query,
	callback,
	cancelCallback?,
	options?
) => {
	return listenerCreator(
		onChildRemoved_,
		// @ts-expect-error
		query,
		callback,
		cancelCallback,
		options
	)
}
