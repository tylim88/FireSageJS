import { ServerTimestamp } from '../types'
import { serverTimestamp as serverTimestamp_ } from 'firebase/database'

export const serverTimestamp = (): ServerTimestamp => {
	// @ts-expect-error
	return serverTimestamp_()
}
