import { query } from '../refs'
import { usersRef, initializeApp } from '../utilForTests'
import { orderByPriority } from './orderByPriority'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()

describe('test orderByPriority', () => {
	it('incorrect value test', () => {
		;() => {
			query(
				usersRef('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt({})
			)
			query(
				usersRef('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				usersRef('b/h/abc/m'),
				orderByPriority(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				usersRef('b/h/abc/p'),
				orderByPriority(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				usersRef('b/h/abc/s'),
				orderByPriority(),
				// @ts-expect-error
				startAt([])
			)
			query(
				usersRef('b/h'),
				orderByPriority(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				usersRef('w'),
				orderByPriority(),
				// @ts-expect-error
				startAt(increment())
			)
		}
	})
	it('correct value, child path test but incorrect key path tests by switching numeric string with non numeric string', () => {
		query(
			usersRef('b/h/abc/m'),
			orderByPriority(),
			// @ts-expect-error
			startAt('9', '123')
		)
		query(
			usersRef('b/h/abc/p'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			usersRef('b/h/abc/s'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, 'abc')
		)
		query(
			usersRef('b/h'),
			orderByPriority(),
			// @ts-expect-error
			startAt(null, '123')
		)
		query(
			usersRef('b/h'),
			orderByPriority(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			usersRef('w'),
			orderByPriority(),
			// @ts-expect-error
			startAt('abc', 'abc')
		)
	})
	it('correct value, child path and key path tests', () => {
		query(usersRef('b/h/abc/m'), orderByPriority(), startAt('9', 'abc'))
		query(usersRef('b/h/abc/p'), orderByPriority(), startAt(123, 'abc'))
		query(usersRef('b/h/abc/s'), orderByPriority(), startAt(123, '123'))
		query(usersRef('b/h'), orderByPriority(), startAt(null, 'abc'))
		query(usersRef('b/h'), orderByPriority(), startAt(123, 'abc'))
		query(usersRef('w'), orderByPriority(), startAt('abc', '123'))
	})
})
