import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()
const ref = usersCreator().ref

describe('test orderByChild', () => {
	it('incorrect value test, but also test for correct child path', () => {
		query(
			ref('b/h'),
			orderByChild('m'),
			// @ts-expect-error
			startAt('abc')
		)
		query(
			ref('b/h'),
			orderByChild('p'),
			// @ts-expect-error
			startAt(123)
		)
		query(
			ref('b/h'),
			orderByChild('s'),
			// @ts-expect-error
			startAt(true)
		)
		query(
			ref('b/h/abc/m'),
			orderByChild('n'),
			// @ts-expect-error
			startAt('abc')
		)
		expect(() =>
			query(
				ref('b/h/abc/p'),
				orderByChild('r'),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
		).toThrow()
		query(
			ref('b/h/abc/s'),
			orderByChild('t'),
			// @ts-expect-error
			startAt(true)
		)
		query(
			ref('b/h'),
			orderByChild('i'),
			// @ts-expect-error
			startAt(123)
		)
		expect(() =>
			query(
				ref('b/h'),
				orderByChild('l'),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
		).toThrow()
		expect(() =>
			query(
				ref('w'),
				orderByChild('v'),
				// @ts-expect-error
				startAt(increment())
			)
		).toThrow()
	})
	it('incorrect path test', () => {
		query(
			ref('b/h'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			ref('b/h/abc/p'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			ref('b/h/abc/m'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			ref('b/h/abc/s'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			ref('o'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			ref('q'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			ref('u'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			ref('w'),
			// @ts-expect-error
			orderByChild('123')
		)
	})
	it('positive value, child path test but negative key path tests by switching numeric string with non numeric string', () => {
		query(
			ref('b/h/abc/m'),
			orderByChild('n'),
			// @ts-expect-error
			startAt('9', '123')
		)
		query(
			ref('b/h/abc/p'),
			orderByChild('r'),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			ref('b/h/abc/s'),
			orderByChild('t'),
			// @ts-expect-error
			startAt(123, 'abc')
		)
		query(
			ref('b/h'),
			orderByChild('i'),
			// @ts-expect-error
			startAt(true, '123')
		)
		query(
			ref('b/h'),
			orderByChild('l'),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			ref('w'),
			orderByChild('v'),
			// @ts-expect-error
			startAt(false, 'abc')
		)
	})
	it('positive value, child path and key path tests', () => {
		query(ref('b/h/abc/m'), orderByChild('n'), startAt('9', 'abc'))
		query(ref('b/h/abc/p'), orderByChild('r'), startAt(123, 'abc'))
		query(ref('b/h/abc/s'), orderByChild('t'), startAt(123, '123'))
		query(ref('b/h'), orderByChild('i'), startAt(true, 'abc'))
		query(ref('b/h'), orderByChild('l'), startAt(123, 'abc'))
		query(ref('w'), orderByChild('v'), startAt(false, '123'))
	})
})
