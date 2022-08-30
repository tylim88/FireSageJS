import { onChildChanged as onChildChanged_ } from 'firebase/database'
import { OnChildChanged } from '../types'
import { listenerCreator } from './utils'

export const onChildChanged: OnChildChanged = (
	query,
	callback,
	cancelCallback,
	options?
) => {
	return listenerCreator(
		onChildChanged_,
		// @ts-expect-error
		query,
		callback,
		cancelCallback,
		options
	)
}
