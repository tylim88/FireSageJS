import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByKey } from './orderByKey'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const ref = usersCreator().ref

describe('test orderByKey', () => {
	it('incorrect key type test', () => {
		;() => {
			query(
				ref('b/h'),
				orderByKey(),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
			query(
				ref('b/h/abc/m'),
				orderByKey(),
				// @ts-expect-error
				startAt(increment())
			)
			query(
				ref('b/h/abc/p'),
				orderByKey(),
				// @ts-expect-error
				startAt(true)
			)
			query(
				ref('b/h/abc/s'),
				orderByKey(),
				// @ts-expect-error
				startAt(null)
			)
			query(
				ref('o'),
				orderByKey(),
				// @ts-expect-error
				startAt(undefined)
			)
			query(
				ref('q'),
				orderByKey(),
				// @ts-expect-error
				startAt({})
			)
			query(
				ref('u'),
				orderByKey(),
				// @ts-expect-error
				startAt(() => {
					//
				})
			)
			query(
				ref('w'),
				orderByKey(),
				// @ts-expect-error
				startAt([])
			)
		}
	})
	it('incorrect key test by switching numeric string with non numeric string', () => {
		query(
			ref('b/h'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			ref('b/h/abc/m'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			ref('b/h/abc/p'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			ref('b/h/abc/s'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
		query(
			ref('o'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			ref('q'),
			orderByKey(),
			// @ts-expect-error
			startAt('123')
		)
		query(
			ref('u'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
		query(
			ref('w'),
			orderByKey(),
			// @ts-expect-error
			startAt('abc')
		)
	})
	it('only one argument test negative test', () => {
		;() => {
			query(
				ref('b/h/abc/m'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				ref('b/h/abc/p'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				ref('b/h/abc/s'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
			query(
				ref('b/h'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', 'abc')
			)
			query(
				ref('o'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', '123')
			)
			query(
				ref('q'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc', '123')
			)
			query(
				ref('u'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
			query(
				ref('w'),
				orderByKey(),
				// @ts-expect-error
				startAt('123', '123')
			)
		}
	})
	it('positive test', () => {
		query(ref('b/h/abc/m'), orderByKey(), startAt('abc'))
		query(ref('b/h/abc/p'), orderByKey(), startAt('abc'))
		query(ref('b/h/abc/s'), orderByKey(), startAt('123'))
		query(ref('b/h'), orderByKey(), startAt('abc'))
		query(ref('o'), orderByKey(), startAt('abc'))
		query(ref('q'), orderByKey(), startAt('abc'))
		query(ref('u'), orderByKey(), startAt('123'))
		query(ref('w'), orderByKey(), startAt('123'))
	})
})
