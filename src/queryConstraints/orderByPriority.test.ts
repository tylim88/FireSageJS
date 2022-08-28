import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByPriority } from './orderByPriority'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const ref = usersCreator().ref

describe('test orderByPriority', () => {
	it('incorrect value test, but also test for correct child path', () => {
		;() => {
			query(
				ref('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt({})
			)
			query(
				ref('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				ref('b/h/abc/m'),
				orderByPriority(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				ref('b/h/abc/p'),
				orderByPriority(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				ref('b/h/abc/s'),
				orderByPriority(),
				// @ts-expect-error
				startAt([])
			)
			query(
				ref('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				ref('w'),
				orderByPriority(),
				// @ts-expect-error
				startAt(increment())
			)
		}
	})
	it('positive value, child path test but negative key path tests by switching numeric string with non numeric string', () => {
		query(
			ref('b/h/abc/m'),
			orderByPriority(),
			// @ts-expect-error
			startAt('9', '123')
		)
		query(
			ref('b/h/abc/p'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			ref('b/h/abc/s'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, 'abc')
		)
		query(
			ref('b/h'),
			orderByPriority(),
			// @ts-expect-error
			startAt(null, '123')
		)
		query(
			ref('b/h'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			ref('w'),
			orderByPriority(),
			// @ts-expect-error
			startAt('abc', 'abc')
		)
	})
	it('positive value, child path and key path tests', () => {
		query(ref('b/h/abc/m'), orderByPriority(), startAt('9', 'abc'))
		query(ref('b/h/abc/p'), orderByPriority(), startAt(123, 'abc'))
		query(ref('b/h/abc/s'), orderByPriority(), startAt(123, '123'))
		query(ref('b/h'), orderByPriority(), startAt(null, 'abc'))
		query(ref('b/h'), orderByPriority(), startAt(123, 'abc'))
		query(ref('w'), orderByPriority(), startAt('abc', '123'))
	})
})
