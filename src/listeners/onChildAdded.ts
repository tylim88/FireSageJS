import { onChildAdded as onChildAdded_ } from 'firebase/database'
import { OnChildAdded } from '../types'
import { isOptions } from '../utils'
import { callbackTransformer } from './utils'

export const onChildAdded: OnChildAdded = (
	query,
	callback,
	cancelCallback?,
	options?
) => {
	const cancelCallback_ = isOptions(cancelCallback) ? undefined : cancelCallback
	const options_ =
		options || (isOptions(cancelCallback) ? cancelCallback : undefined)
	const callback_ = callbackTransformer(callback)
	if (cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback_, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback_, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback_, options_)
	} else {
		// @ts-expect-error
		return onChildAdded_(query, callback_)
	}
}
