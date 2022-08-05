import { ServerTimestamp } from '../types'
import { serverTimestamp as serverTimestamp_ } from 'firebase/database'
/**
 * Returns a placeholder value for auto-populating the current timestamp (time since the Unix epoch, in milliseconds) as determined by the Firebase servers.
 */
export const serverTimestamp = () => {
	return serverTimestamp_() as ServerTimestamp
}
