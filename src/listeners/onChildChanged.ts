import { onChildChanged as onChildChanged_ } from 'firebase/database'
import { ListenOptions, OnChildChanged } from '../types'
import { isOptions } from '../utils'

export const onChildChanged: OnChildChanged = (
	ref,
	callback,
	cancelCallback?: ((error: Error) => unknown) | ListenOptions,
	options?: ListenOptions
) => {
	const cancelCallback_ = isOptions(cancelCallback) ? undefined : cancelCallback
	const options_ =
		options || (isOptions(cancelCallback) ? cancelCallback : undefined)
	if (cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildChanged_(ref, callback, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildChanged_(ref, callback, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildChanged_(ref, callback, options_)
	} else {
		// @ts-expect-error
		return onChildChanged_(ref, callback)
	}
}