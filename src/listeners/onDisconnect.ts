import { onDisconnect as onDisconnect_ } from 'firebase/database'
import { OnDisconnect } from '../types'
import { createObjectFromKeysAndValues } from '../utils'

/**
 * Returns an `OnDisconnect` object - see
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information on how to use it.
 *
 * @param ref - The reference to add OnDisconnect triggers for.
 */
// @ts-expect-error
export const onDisconnect: OnDisconnect = ref => {
	const onDc = onDisconnect_(ref as any)

	return {
		cancel: () => onDc.cancel(),
		remove: () => onDc.remove(),
		set: value => onDc.set(value),
		update: (paths: string[], values: unknown[]) =>
			onDc.update(createObjectFromKeysAndValues(paths, values)),
	}
}
