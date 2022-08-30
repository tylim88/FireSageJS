import { set, get } from '../operations'
import { initializeApp, usersRef } from '../utilForTests'
import { remove } from './remove'

initializeApp()
describe('test remove]', () => {
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
		const ref2 = usersRef('b/d/k')
		await set(ref1, { abc: { n: '7' } })
		await remove(ref1)
		const data1 = (await get(ref1)).val()
		expect(data1).toBe(null)
		await set(ref2, 'hahaha')
		await remove(ref2)
		const data2 = (await get(ref2)).val()
		expect(data2).toBe(null)
	})
})
