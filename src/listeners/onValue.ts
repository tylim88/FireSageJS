import { onValue as onValue_ } from 'firebase/database'
import { OnValue } from '../types'
import { listenerCreator } from './utils'

export const onValue: OnValue = (
	query,
	callback,
	cancelCallback?,
	options?
) => {
	return listenerCreator(onValue_, query, callback, cancelCallback, options)
}
