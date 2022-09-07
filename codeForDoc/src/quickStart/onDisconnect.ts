import { exampleRef } from './createRef'
import { serverTimestamp, onDisconnect } from 'firesagejs'
//
;async () => {
	const onDc = onDisconnect(exampleRef('b'))

	await onDc.set({ c: false, d: { e: serverTimestamp() } })

	await onDc.update(['c', 'd'], [false, { e: serverTimestamp() }])

	await onDc.remove()

	await onDc.cancel()
}
