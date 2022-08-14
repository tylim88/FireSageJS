import { DetectInvalidSegment } from './detectInvalidSegment'
import { Users } from '../utilForTests'
import { IsSame, IsTrue } from './utils'
import {
	ErrorInvalidPathTypeNeedString,
	ErrorInvalidPathTypeOrNeedNumber,
} from './error'

describe('test ReplaceInvalidLastSegment', () => {
	it('positive case', () => {
		type A = DetectInvalidSegment<Users, 'a'>
		type B = DetectInvalidSegment<Users, `b/h/${string}`>
		type C = DetectInvalidSegment<Users, `b/h/${string}/s/${number}`>
		type D = DetectInvalidSegment<Users, `b/h/abc`>
		type E = DetectInvalidSegment<Users, `b/h/${string}/s/123`>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	})
	it('negative case', () => {
		type A = DetectInvalidSegment<
			Users,
			// @ts-expect-error
			'a/b'
		>
		type B = DetectInvalidSegment<Users, `b/h/${number}`>
		type C = DetectInvalidSegment<Users, `b/h/${string}/s/${string}`>
		type D = DetectInvalidSegment<Users, `b/h/123`>
		type E = DetectInvalidSegment<Users, `b/h/${string}/s/abc`>

		IsTrue<IsSame<A, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<B, ErrorInvalidPathTypeNeedString>>()
		IsTrue<IsSame<C, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<D, ErrorInvalidPathTypeNeedString>>()
		IsTrue<IsSame<E, ErrorInvalidPathTypeOrNeedNumber>>()
	})
})
