import { onChildChanged as onChildChanged_ } from 'firebase/database'
import { OnChildChanged } from '../types'
import { isOptions } from '../utils'
import { callbackTransformer } from './utils'

export const onChildChanged: OnChildChanged = (
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
		return onChildChanged_(query, callback_, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildChanged_(query, callback_, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildChanged_(query, callback_, options_)
	} else {
		// @ts-expect-error
		return onChildChanged_(query, callback_)
	}
}
