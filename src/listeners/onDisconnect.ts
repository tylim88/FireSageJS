import { onDisconnect as onDisconnect_ } from 'firebase/database'
import { OnDisconnect } from '../types'

/**
 * Returns an `OnDisconnect` object - see
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information on how to use it.
 *
 * @param ref - The reference to add OnDisconnect triggers for.
 */
export const onDisconnect: OnDisconnect = ref => {
	return onDisconnect_(ref as any) // ! Schrödinger's error
}
