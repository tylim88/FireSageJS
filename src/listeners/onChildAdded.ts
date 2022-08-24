import { onChildAdded as onChildAdded_ } from 'firebase/database'
import { ListenOptions, OnChildAdded } from '../types'
import { isOptions } from '../utils'

export const onChildAdded: OnChildAdded = (
	query: unknown,
	callback: unknown,
	cancelCallback?: ((error: Error) => unknown) | ListenOptions,
	options?: ListenOptions
) => {
	const cancelCallback_ = isOptions(cancelCallback) ? undefined : cancelCallback
	const options_ =
		options || (isOptions(cancelCallback) ? cancelCallback : undefined)
	if (cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onChildAdded_(query, callback, options_)
	} else {
		// @ts-expect-error
		return onChildAdded_(query, callback)
	}
}
