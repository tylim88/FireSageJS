import { set, get, push } from '../operations'
import { initializeApp, usersRefCreator } from '../utilForTests'
import { remove } from './remove'
import { serverTimestamp } from '../fieldValue'

initializeApp()
const usersRef = usersRefCreator()
describe('test remove', () => {
	it('test incorrect type', async () => {
		remove(
			// @ts-expect-error
			usersRef('a')
		)

		remove(
			// @ts-expect-error
			usersRef('b/h')
		)

		remove(
			// @ts-expect-error
			usersRef('o')
		)
	})

	it('test functionality', async () => {
		const ref1 = usersRef('b/h/abc/m')
		const ref2 = usersRef('b/h/abc/p')
		await set(ref1, { abc: { n: '7' } })
		await remove(ref1)
		const data1 = (await get(ref1)).val()
		expect(data1).toBe(null)
		await push(ref2, { r: serverTimestamp() })
		await remove(ref2)
		const data2 = (await get(ref2)).val()
		expect(data2).toBe(null)
	})
})
