import { query } from './query'
import { usersRefCreator, initializeApp } from '../utilForTests'
import {
	equalTo,
	endAt,
	endBefore,
	startAfter,
	startAt,
	orderByKey,
	orderByValue,
	orderByChild,
} from '../queryConstraints'

initializeApp()
const usersRef = usersRefCreator()

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
		query(usersRef('b/h'), orderByChild('i'))
		query(usersRef('b/h/abc/m'), orderByKey())
		query(usersRef('b/h/abc/p'), orderByValue())
		query(usersRef('b/h/abc/s'))
		query(usersRef('o'))
		query(usersRef('q'))
		query(usersRef('u'))
		query(usersRef('w'))
	})

	it('test fail cursor combination', () => {
		;() => {
			query(
				usersRef('q'),
				orderByKey(),
				// @ts-expect-error
				startAfter('abc'),
				startAt('efg')
			)
			query(
				usersRef('q'),
				orderByKey(),
				// @ts-expect-error
				startAfter('abc'),
				startAfter('efg')
			)
			query(
				usersRef('o'),
				orderByKey(),
				// @ts-expect-error
				startAt('efg'),
				startAfter('abc')
			)
			query(
				usersRef('o'),
				orderByKey(),
				// @ts-expect-error
				startAt('abc'),
				startAt('efg')
			)
			query(
				usersRef('u'),
				orderByValue(),
				// @ts-expect-error
				endAt('efg'),
				endBefore('abc')
			)
			query(
				usersRef('u'),
				orderByValue(),
				// @ts-expect-error
				endBefore('abc'),
				endBefore('efg')
			)
			query(
				usersRef('u'),
				orderByKey(),
				// @ts-expect-error
				endBefore('123'),
				endAt('456')
			)
			query(
				usersRef('u'),
				orderByKey(),
				// @ts-expect-error
				endAt('456'),
				endAt('123')
			)
			query(
				usersRef('w'),
				orderByChild('v'),
				// @ts-expect-error
				equalTo(false),
				startAt(true)
			)
			query(
				usersRef('w'),
				orderByKey(),
				// @ts-expect-error
				startAfter('456'),
				equalTo('789')
			)
		}
	})

	it('test pass cursor combination', () => {
		query(usersRef('q'), orderByKey(), startAfter('abc'), endAt('efg'))
		query(usersRef('o'), orderByKey(), endBefore('efg'), startAfter('abc'))
		query(usersRef('u'), orderByValue(), startAt('efg'), endBefore('abc'))
		query(usersRef('u'), orderByKey(), startAt('123'), endAt('456'))
		query(usersRef('w'), orderByChild('v'), equalTo(true))
		query(usersRef('w'), orderByKey(), equalTo('789'))
	})
})
