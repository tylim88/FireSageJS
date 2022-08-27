import { query } from './query'
import { usersCreator, initializeApp } from '../utilForTests'

initializeApp()
const ref = usersCreator().ref

// functional test is tested with get and listener
describe('test query type', () => {
	it('test fail type', () => {
		query(
			// @ts-expect-error
			ref('a')
		)
		query(
			// @ts-expect-error
			ref('b')
		)
		query(
			// @ts-expect-error
			ref('b/c')
		)
		query(
			// @ts-expect-error
			ref('b/d')
		)
		query(
			// @ts-expect-error
			ref('b/d/e')
		)
		query(
			// @ts-expect-error
			ref('b/d/f')
		)
		query(
			// @ts-expect-error
			ref('b/d/f/j')
		)
		query(
			// @ts-expect-error
			ref('b/d/k')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/i')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/l')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/m/efg')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/p/efg')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/s/123')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/m/efg/n')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/p/efg/r')
		)
		query(
			// @ts-expect-error
			ref('b/h/abc/s/123/t')
		)
		query(
			// @ts-expect-error
			ref('o/abc')
		)
		query(
			// @ts-expect-error
			ref('q/abc')
		)
		query(
			// @ts-expect-error
			ref('u/123')
		)
		query(
			// @ts-expect-error
			ref('w/123')
		)
		query(
			// @ts-expect-error
			ref('w/123/vs')
		)
		query(
			ref(
				// @ts-expect-error
				'notExist'
			)
		)
	})
	it('test pass type', () => {
		query(ref('b/h'))
		query(ref('b/h/abc/m'))
		query(ref('b/h/abc/p'))
		query(ref('b/h/abc/s'))
		query(ref('o'))
		query(ref('q'))
		query(ref('u'))
		query(ref('w'))
	})
})
