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
		const path = 'b/h/abc/m'
		await set(
			users.ref(path),
			// @ts-expect-error
			null
		)
		await push(users.ref(path), { n: '7' })

		// TODO check return data
	})
})
