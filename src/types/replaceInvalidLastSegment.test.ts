import { ReplaceInvalidLastSegment } from './replaceInvalidLastSegment'
import { Users } from '../utilForTests'
import { IsSame, IsTrue } from './utils'
import { ErrorNeedString, ErrorInvalidPathTypeOrNeedNumber } from './error'

describe('test ReplaceInvalidLastSegment', () => {
	it('positive case', () => {
		type A = ReplaceInvalidLastSegment<Users, 'a'>
		type B = ReplaceInvalidLastSegment<Users, `b/h/${string}`>
		type C = ReplaceInvalidLastSegment<Users, `b/h/${string}/s/${number}`>
		type D = ReplaceInvalidLastSegment<Users, `b/h/abc`>
		type E = ReplaceInvalidLastSegment<Users, `b/h/${string}/s/123`>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	})
	it('negative case', () => {
		type A = ReplaceInvalidLastSegment<
			Users,
			// @ts-expect-error
			'a/b'
		>
		type B = ReplaceInvalidLastSegment<Users, `b/h/${number}`>
		type C = ReplaceInvalidLastSegment<Users, `b/h/${string}/s/${string}`>
		type D = ReplaceInvalidLastSegment<Users, `b/h/123`>
		type E = ReplaceInvalidLastSegment<Users, `b/h/${string}/s/abc`>

		IsTrue<IsSame<A, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<B, ErrorNeedString>>()
		IsTrue<IsSame<C, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<D, ErrorNeedString>>()
		IsTrue<IsSame<E, ErrorInvalidPathTypeOrNeedNumber>>()
	})
})
