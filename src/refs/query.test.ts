import { query } from './query'
import { usersRef, initializeApp } from '../utilForTests'

initializeApp()

// functional test is tested with get and listener
describe('test query type', () => {
	it('test fail type', () => {
		query(
			// @ts-expect-error
			usersRef('a')
		)
		query(
			// @ts-expect-error
			usersRef('b')
		)
		query(
			// @ts-expect-error
			usersRef('b/c')
		)
		query(
			// @ts-expect-error
			usersRef('b/d')
		)
		query(
			// @ts-expect-error
			usersRef('b/d/e')
		)
		query(
			// @ts-expect-error
			usersRef('b/d/f')
		)
		query(
			// @ts-expect-error
			usersRef('b/d/f/j')
		)
		query(
			// @ts-expect-error
			usersRef('b/d/k')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/i')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/l')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/m/efg')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/p/efg')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/s/123')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/m/efg/n')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/p/efg/r')
		)
		query(
			// @ts-expect-error
			usersRef('b/h/abc/s/123/t')
		)
		query(
			// @ts-expect-error
			usersRef('o/abc')
		)
		query(
			// @ts-expect-error
			usersRef('q/abc')
		)
		query(
			// @ts-expect-error
			usersRef('u/123')
		)
		query(
			// @ts-expect-error
			usersRef('w/123')
		)
		query(
			// @ts-expect-error
			usersRef('w/123/vs')
		)
		query(
			usersRef(
				// @ts-expect-error
				'notExist'
			)
		)
	})
	it('test pass type', () => {
		query(usersRef('b/h'))
		query(usersRef('b/h/abc/m'))
		query(usersRef('b/h/abc/p'))
		query(usersRef('b/h/abc/s'))
		query(usersRef('o'))
		query(usersRef('q'))
		query(usersRef('u'))
		query(usersRef('w'))
	})
})
