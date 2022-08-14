import { set, get } from '../operations'
import { initializeApp, usersCreator } from '../utilForTests'
import { push } from './push'
import { serverTimestamp } from './serverTimestamp'

initializeApp()
const users = usersCreator()
describe('test push]', () => {
	it('test incorrect ref type', async () => {
		;() => {
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
				// @ts-expect-error
				users.ref('b/h/ushd/hdsghj'),
				1
			)
			push(
				// @ts-expect-error
				users.ref('b/h/abc/s'),
				1
			)
		}
	})

	it('test incorrect data type', async () => {
		;() => {
			push(
				users.ref('b/h/abc/m'),
				// @ts-expect-error
				1
			)
			push(
				users.ref('o'),
				// @ts-expect-error
				'abc'
			)
			push(
				users.ref('b/h/abc/p'),
				// @ts-expect-error
				1
			)
			push(
				users.ref('q'),
				// @ts-expect-error
				'abc'
			)
		}
	})

	it('test functionality push able', async () => {
		const ref1 = users.ref('b/h/abc/m')
		await set(
			ref1,
			// @ts-expect-error
			null
		)
		await push(ref1, { n: '7' })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)

		const ref2 = users.ref('o')
		await set(
			ref2,
			// @ts-expect-error
			null
		)
		await push(ref2, 1)
		const data2 = (await get(ref2)).val()
		expect(data2).not.toBe(null)
	})

	it('test functionality push able only', async () => {
		const ref1 = users.ref('b/h/abc/p')
		await set(
			ref1,
			// @ts-expect-error
			null
		)
		await push(ref1, { r: serverTimestamp() })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)

		const ref2 = users.ref('q')
		await set(
			ref2,
			// @ts-expect-error
			null
		)
		await push(ref2, 4)
		const data2 = (await get(ref2)).val()
		expect(data2).not.toBe(null)
	})
})
