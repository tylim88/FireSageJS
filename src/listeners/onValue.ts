import { onValue as onValue_ } from 'firebase/database'
import { ListenOptions, OnValue } from '../types'

export const isOptions = (
	arg: ((error: Error) => unknown) | (() => void) | ListenOptions | undefined
): arg is ListenOptions => {
	const v = arg as Partial<ListenOptions>
	return v?.onlyOnce !== undefined // onlyOnce is boolean, so check for undefined
}

export const onValue: OnValue = (
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
		return onValue_(ref, callback, cancelCallback_, options_)
	} else if (cancelCallback_ && !options_) {
		// @ts-expect-error
		return onValue_(ref, callback, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		// @ts-expect-error
		return onValue_(ref, callback, options_)
	} else {
		// @ts-expect-error
		return onValue_(ref, callback)
	}
}
