import { set } from '../operations'
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
		await set(
			ref2,
			// @ts-expect-error
			null
		)
		await push(ref2, 1)

		// TODO check return data
	})
})
