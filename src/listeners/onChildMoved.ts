import { onChildMoved as onChildMoved_ } from 'firebase/database'
import { OnChildMoved } from '../types'
import { isOptions } from '../utils'
import { callbackTransformer } from './utils'

export const onChildMoved: OnChildMoved = (
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
		return onChildMoved_(query, callback_, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildMoved_(query, callback_, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildMoved_(query, callback_, options_)
	} else {
		// @ts-expect-error
		return onChildMoved_(query, callback_)
	}
}
