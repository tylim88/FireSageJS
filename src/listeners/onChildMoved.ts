import { onChildMoved as onChildMoved_ } from 'firebase/database'
import { OnChildMoved } from '../types'
import { listenerCreator } from './utils'

export const onChildMoved: OnChildMoved = (
	query,
	callback,
	cancelCallback,
	options?
) => {
	return listenerCreator(
		onChildMoved_,
		// @ts-expect-error
		query,
		callback,
		cancelCallback,
		options
	)
}
