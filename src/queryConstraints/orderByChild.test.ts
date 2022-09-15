import { query } from '../refs'
import { usersRef, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'
import { startAt } from './startAt'
import { serverTimestamp, increment } from '../fieldValue'

initializeApp()

describe('test orderByChild', () => {
	it('test for child path where the type of child is not boolean, number, string or null', () => {
		query(
			usersRef('b/h'),
			// @ts-expect-error
			orderByChild('m'),
			startAt('abc')
		)
		query(
			usersRef('b/h'),
			// @ts-expect-error
			orderByChild('p'),
			startAt(123)
		)
		query(
			usersRef('b/h'),
			// @ts-expect-error
			orderByChild('s'),
			startAt(true)
		)
	})
	it('incorrect value test, but also test for correct child path', () => {
		query(
			usersRef('b/h/abc/m'),
			orderByChild('n'),
			// @ts-expect-error
			startAt('abc')
		)
		expect(() =>
			query(
				usersRef('b/h/abc/p'),
				orderByChild('r'),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
		).toThrow()
		query(
			usersRef('b/h/abc/s'),
			orderByChild('t'),
			// @ts-expect-error
			startAt(true)
		)
		query(
			usersRef('b/h'),
			orderByChild('i'),
			// @ts-expect-error
			startAt(123)
		)
		expect(() =>
			query(
				usersRef('b/h'),
				orderByChild('l'),
				// @ts-expect-error
				startAt(serverTimestamp())
			)
		).toThrow()
		expect(() =>
			query(
				usersRef('w'),
				orderByChild('v'),
				// @ts-expect-error
				startAt(increment())
			)
		).toThrow()
	})
	it('incorrect path test', () => {
		query(
			usersRef('b/h'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			usersRef('b/h/abc/p'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			usersRef('b/h/abc/m'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			usersRef('b/h/abc/s'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			usersRef('o'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			usersRef('q'),
			// @ts-expect-error
			orderByChild('123')
		)
		query(
			usersRef('u'),
			// @ts-expect-error
			orderByChild('zzz')
		)
		query(
			usersRef('w'),
			// @ts-expect-error
			orderByChild('123')
		)
	})
	it('correct value, child path test but incorrect key path tests by switching numeric string with non numeric string', () => {
		query(
			usersRef('b/h/abc/m'),
			orderByChild('n'),
			// @ts-expect-error
			startAt('9', '123')
		)
		query(
			usersRef('b/h/abc/p'),
			orderByChild('r'),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			usersRef('b/h/abc/s'),
			orderByChild('t'),
			// @ts-expect-error
			startAt(123, 'abc')
		)
		query(
			usersRef('b/h'),
			orderByChild('i'),
			// @ts-expect-error
			startAt(true, '123')
		)
		query(
			usersRef('b/h'),
			orderByChild('l'),
			// @ts-expect-error
			startAt(123, '123')
		)
		query(
			usersRef('w'),
			orderByChild('v'),
			// @ts-expect-error
			startAt(false, 'abc')
		)
	})
	it('correct value, child path and key path tests', () => {
		query(usersRef('b/h/abc/m'), orderByChild('n'), startAt('9', 'abc'))
		query(usersRef('b/h/abc/p'), orderByChild('r'), startAt(123, 'abc'))
		query(usersRef('b/h/abc/s'), orderByChild('t'), startAt(123, '123'))
		query(usersRef('b/h'), orderByChild('i'), startAt(true, 'abc'))
		query(usersRef('b/h'), orderByChild('l'), startAt(123, 'abc'))
		query(usersRef('w'), orderByChild('v'), startAt(false, '123'))
	})
})
