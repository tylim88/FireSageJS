import { set, get } from '../operations'
import { initializeApp, usersCreator } from '../utilForTests'
import { push } from './push'

initializeApp()
const users = usersCreator()
describe('test push]', () => {
	it('test incorrect type', async () => {
		push(
			// @ts-expect-error
			users.ref('a'),
			1
		)

		push(
			// @ts-expect-error
			users.ref('b/h'),
			1
		)

		push(
			users.ref('b/h/abc/m'),
			// @ts-expect-error
			1
		)
	})

	it('test functionality', async () => {
		const ref1 = users.ref('b/h/abc/m')
		const ref2 = users.ref('o')
		await set(
			ref1,
			// @ts-expect-error
			null
		)
		await push(ref1, { n: '7' })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)
		await set(
			ref2,
			// @ts-expect-error
			null
		)
		await push(ref2, 1)
		const data2 = (await get(ref2)).val()
		expect(data2).not.toBe(null)
	})
})
