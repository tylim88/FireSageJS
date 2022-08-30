import { set, get } from '../operations'
import { initializeApp, usersRef } from '../utilForTests'
import { push } from './push'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()

describe('test push]', () => {
	it('test incorrect ref type', async () => {
		;() => {
			push(
				// @ts-expect-error
				usersRef('a'),
				1
			)

			push(
				// @ts-expect-error
				usersRef('b/h'),
				1
			)

			push(
				// @ts-expect-error
				usersRef('b/h/ushd/hdsghj'),
				1
			)
			push(
				// @ts-expect-error
				usersRef('b/h/abc/s'),
				1
			)
		}
	})

	it('test incorrect data type', async () => {
		;() => {
			push(
				usersRef('b/h/abc/m'),
				// @ts-expect-error
				1
			)
			push(
				usersRef('o'),
				// @ts-expect-error
				'abc'
			)
			push(
				usersRef('b/h/abc/p'),
				// @ts-expect-error
				1
			)
			push(
				usersRef('q'),
				// @ts-expect-error
				'abc'
			)
		}
	})

	it('test functionality push able', async () => {
		const ref1 = usersRef('b/h/abc/m')
		await set(ref1, { abc: { n: '1' } })
		await push(ref1, { n: '7' })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)

		const ref2 = usersRef('o')
		await set(ref2, { abc: increment(1) })
		await push(ref2, 1)
		const data2 = (await get(ref2)).val()
		expect(data2).not.toBe(null)
	})

	it('test functionality push able only', async () => {
		const ref1 = usersRef('b/h/abc/p')
		await set(
			// @ts-expect-error
			ref1,
			null
		)
		await push(ref1, { r: serverTimestamp() })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)

		const ref2 = usersRef('q')
		await set(
			// @ts-expect-error
			ref2,
			null
		)
		await push(ref2, 4)
		const data2 = (await get(ref2)).val()
		expect(data2).not.toBe(null)
	})
})
