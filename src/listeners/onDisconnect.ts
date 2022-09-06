import { onDisconnect as onDisconnect_ } from 'firebase/database'
import { OnDisconnect } from '../types'

export const onDisconnect: OnDisconnect = ref => {
	return onDisconnect_(ref)
}
