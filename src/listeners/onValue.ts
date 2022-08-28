import { onValue as onValue_ } from 'firebase/database'
import { OnValue } from '../types'
import { isOptions } from '../utils'
import { callbackTransformer } from './utils'

export const onValue: OnValue = (
	query,
	callback,
	cancelCallback?,
	options? // ! why type of options is unknown
) => {
	const cancelCallback_ = isOptions(cancelCallback) ? undefined : cancelCallback
	const options_ =
		options || (isOptions(cancelCallback) ? cancelCallback : undefined)
	const callback_ = callbackTransformer(callback)
	if (cancelCallback_ && options_) {
		return onValue_(query, callback_, cancelCallback_, options_ as any) // ! error: Unused '@ts-expect-error' directive but ts expect error still working, invisible error
	} else if (cancelCallback_ && !options_) {
		return onValue_(query, callback_, cancelCallback_)
	} else if (!cancelCallback_ && options_) {
		return onValue_(query, callback_, options_ as any) // ! error: Unused '@ts-expect-error' directive but ts expect error still working, invisible error
	} else {
		return onValue_(query, callback_)
	}
}
