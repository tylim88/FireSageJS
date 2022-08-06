import { runTransaction } from './runTransaction'
import { initializeApp, usersCreator } from '../utilForTests'
import { serverTimestamp } from '../fieldValue'

initializeApp()
const users = usersCreator()
describe('test run transaction', () => {
	it('test b/d/f path', async () => {
		const result = await runTransaction(
			users.ref('b/d/f'),
			() => {
				return {
					j: 999,
				}
			},
			{ applyLocally: true }
		)
		expect(result.snapshot.val()?.j).toBe(999)
	})

	it('test b/c path', async () => {
		const result = await runTransaction(
			users.ref('b/c'),
			() => {
				return true as const
			},
			{}
		)
		expect(result.snapshot.val()).toBe(true)
	})

	it('test b/h/string/l path', async () => {
		const result = await runTransaction(
			users.ref('b/h/XYZ/l'),
			() => {
				return serverTimestamp()
			},
			{ applyLocally: false }
		)
		expect(typeof result.snapshot.val()).toBe('number')
	})

	it('test b/h/string/m path', async () => {
		const result = await runTransaction(users.ref('b/h/OPQ/m/ABC/n'), () => {
			return '8' as const
		})
		expect(result.snapshot.val()).toBe('8')
	})
})
