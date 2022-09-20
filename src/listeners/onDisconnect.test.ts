import { onDisconnect } from './onDisconnect'
import { usersRefCreator, initializeApp } from '../utilForTests'
import { serverTimestamp } from '../fieldValue'

initializeApp()
const usersRef = usersRefCreator()

// ! how to simulate offline test?
describe('test onDisconnect', () => {
	it('basic test', () => {
		const onDc = onDisconnect(usersRef('b/h/abc/p'))

		onDc.remove()
		onDc.set({ abc: { r: serverTimestamp() } })
		onDc.update(['abc/r'], [serverTimestamp()])
		onDc.cancel()
	})

	it('test wrong type', () => {
		;() => {
			const onDc = onDisconnect(usersRef('b'))

			onDc
				// @ts-expect-error
				.remove()

			onDc.remove(
				// @ts-expect-error
				"Error: The 'b' node is not removable, only Removable node can be removed. Please check the MetaType and union 'b' node with Removable"
			)

			const onDc2 = onDisconnect(usersRef('b/h/abc/p'))
			onDc2.set(
				// @ts-expect-error
				123
			)

			onDc2.update(
				[
					// @ts-expect-error
					'abc/r/b',
				],
				[serverTimestamp()]
			)

			onDc2.update(
				['abc/r'],
				// @ts-expect-error
				[false]
			)
		}
	})
})
