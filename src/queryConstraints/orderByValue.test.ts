import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByValue } from './orderByValue'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const ref = usersCreator().ref

describe('test orderByValue', () => {
	it('incorrect value test', () => {
		;() => {
			query(
				ref('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt({})
			)
			query(
				ref('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				ref('b/h/abc/m'),
				orderByValue(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				ref('b/h/abc/p'),
				orderByValue(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				ref('b/h/abc/s'),
				orderByValue(),
				// @ts-expect-error
				startAt([])
			)
			query(
				ref('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				ref('o'),
				orderByValue(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				ref('q'),
				orderByValue(),
				// @ts-expect-error
				startAt(null)
			)
			query(
				ref('u'),
				orderByValue(),
				// @ts-expect-error
				startAt(undefined)
			)
			query(
				ref('w'),
				orderByValue(),
				// @ts-expect-error
				startAt(increment())
			)
		}
	})
	it('correct value test but incorrect key path tests by switching numeric string with non numeric string', () => {
		query(
			ref('o'),
			orderByValue(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			ref('q'),
			orderByValue(),
			// @ts-expect-error
			startAt(4, '123')
		)
		query(
			ref('u'),
			orderByValue(),
			// @ts-expect-error
			startAt('abc', 'abc')
		)
	})
	it('correct value, child path and key path tests', () => {
		query(ref('o'), orderByValue(), startAt(123, 'abc'))
		query(ref('q'), orderByValue(), startAt(4, 'abc'))
		query(ref('u'), orderByValue(), startAt('abc', '123'))
	})
})
