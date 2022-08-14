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

	it('test b/h/string/m/string/n path', async () => {
		const result = await runTransaction(users.ref('b/h/OPQ/m/ABC/n'), () => {
			return '8' as const
		})
		expect(result.snapshot.val()).toBe('8')
	})

	it('test b/h/string/s numeric/string return type positive case', async () => {
		const result = await runTransaction(users.ref('b/h/OPQ/s'), () => {
			return { 100: { t: 88 } }
		})
		expect(result.snapshot.val()).toEqual({ 100: { t: 88 } })

		const result2 = await runTransaction(users.ref('b/h/OPQ/s'), () => {
			return [{ t: 500 }]
		})
		expect(result2.snapshot.val()).toEqual([{ t: 500 }])
	})

	it('test b/h/string/s return type numeric/string return type negative case', async () => {
		;() =>
			runTransaction(
				users.ref('b/h/OPQ/s'),
				// @ts-expect-error
				() => {
					return { a: 1 }
				}
			)
	})
})
