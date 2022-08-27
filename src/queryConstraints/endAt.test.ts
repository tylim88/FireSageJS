import { endAt } from './endAt'
import { increment } from '../fieldValue'

describe('test orderByChild', () => {
	it('The 1st argument of endAt(), startAfter(), endAt(), endBefore(), or equalTo() can only be string, boolean, number or null. negative test', () => {
		endAt(
			// @ts-expect-error
			{ abc: { n: '7' } }
		)

		endAt(
			// @ts-expect-error
			{ abc: { r: increment() } }
		)

		endAt(
			// @ts-expect-error
			{ 123: { t: 123 } }
		)
	})
	it('The 2nd argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string. negative test', () => {
		expect(() =>
			endAt(
				123,
				// @ts-expect-error
				123
			)
		).toThrow()

		expect(() =>
			endAt(
				true,
				// @ts-expect-error
				true
			)
		).toThrow()

		expect(() =>
			endAt(
				'abc',
				// @ts-expect-error
				null
			)
		).toThrow()
	})
})
