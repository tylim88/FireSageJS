import { query } from '../refs'
import { usersRefCreator, initializeApp } from '../utilForTests'
import { orderByValue } from './orderByValue'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const usersRef = usersRefCreator()

describe('test orderByValue', () => {
	it('incorrect value test', () => {
		;() => {
			query(
				usersRef('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt({})
			)
			query(
				usersRef('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				usersRef('b/h/abc/m'),
				orderByValue(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				usersRef('b/h/abc/p'),
				orderByValue(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				usersRef('b/h/abc/s'),
				orderByValue(),
				// @ts-expect-error
				startAt([])
			)
			query(
				usersRef('b/h'),
				orderByValue(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				usersRef('o'),
				orderByValue(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				usersRef('q'),
				orderByValue(),
				// @ts-expect-error
				startAt(null)
			)
			query(
				usersRef('u'),
				orderByValue(),
				// @ts-expect-error
				startAt(undefined)
			)
			query(
				usersRef('w'),
				orderByValue(),
				// @ts-expect-error
				startAt(increment())
			)
		}
	})
	it('correct value test but incorrect key path tests by switching numeric string with non numeric string', () => {
		query(
			usersRef('o'),
			orderByValue(),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			usersRef('q'),
			orderByValue(),
			// @ts-expect-error
			startAt(4, '123')
		)
		query(
			usersRef('u'),
			orderByValue(),
			// @ts-expect-error
			startAt('abc', 'abc')
		)
	})
	it('correct value, child path and key path tests', () => {
		query(usersRef('o'), orderByValue(), startAt(123, 'abc'))
		query(usersRef('q'), orderByValue(), startAt(4, 'abc'))
		query(usersRef('u'), orderByValue(), startAt('abc', '123'))
	})
})
