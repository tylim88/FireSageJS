import { query } from '../refs'
import { usersRefCreator, initializeApp } from '../utilForTests'
import { orderByKey } from './orderByKey'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const usersRef = usersRefCreator()

describe('test orderByKey', () => {
	it('incorrect key type test', () => {
		;() => {
			query(
				usersRef('b/h'),
				orderByKey(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				usersRef('b/h/abc/m'),
				orderByKey(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				usersRef('b/h/abc/p'),
				orderByKey(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				usersRef('b/h/abc/s'),
				orderByKey(),
				// @ts-expect-error
				startAt(null)
			)
			query(
				usersRef('o'),
				orderByKey(),
				// @ts-expect-error
				startAt(undefined)
			)
			query(
				usersRef('q'),
				orderByKey(),
				// @ts-expect-error
				startAt({})
			)
			query(
				usersRef('u'),
				orderByKey(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				usersRef('w'),
				orderByKey(),
				// @ts-expect-error
				startAt([])
			)
		}
	})
	it('incorrect key test by switching numeric string with non numeric string', () => {
		query(
			usersRef('b/h'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			usersRef('b/h/abc/m'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			usersRef('b/h/abc/p'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			usersRef('b/h/abc/s'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
		query(
			usersRef('o'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			usersRef('q'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			usersRef('u'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
		query(
			usersRef('w'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
	})
	it('only one argument test negative test', () => {
		;() => {
			query(
				usersRef('b/h/abc/m'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				usersRef('b/h/abc/p'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				usersRef('b/h/abc/s'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
			query(
				usersRef('b/h'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				usersRef('o'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', '123')
			)
			query(
				usersRef('q'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', '123')
			)
			query(
				usersRef('u'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
			query(
				usersRef('w'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
		}
	})
	it('positive test', () => {
		query(usersRef('b/h/abc/m'), orderByKey(), startAt('abc'))
		query(usersRef('b/h/abc/p'), orderByKey(), startAt('abc'))
		query(usersRef('b/h/abc/s'), orderByKey(), startAt('123'))
		query(usersRef('b/h'), orderByKey(), startAt('abc'))
		query(usersRef('o'), orderByKey(), startAt('abc'))
		query(usersRef('q'), orderByKey(), startAt('abc'))
		query(usersRef('u'), orderByKey(), startAt('123'))
		query(usersRef('w'), orderByKey(), startAt('123'))
	})
})
