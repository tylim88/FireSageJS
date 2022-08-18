import { ReplaceInvalidSegment } from './replacePathAndType'
import { Users } from '../../utilForTests'
import { IsSame, IsTrue } from './isCommon'
import {
	ErrorNeedStringSegment,
	ErrorInvalidOrNeedNumericSegment,
} from '../error'

describe('test ReplaceInvalidLastSegment', () => {
	it('ReplaceInvalidLastSegment positive case', () => {
		type A = ReplaceInvalidSegment<Users, 'a'>
		type B = ReplaceInvalidSegment<Users, `b/h/${string}`>
		type C = ReplaceInvalidSegment<Users, `b/h/${string}/s/${number}`>
		type D = ReplaceInvalidSegment<Users, `b/h/abc`>
		type E = ReplaceInvalidSegment<Users, `b/h/${string}/s/123`>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	})

	it('ReplaceInvalidLastSegment negative case', () => {
		type A = ReplaceInvalidSegment<
			Users,
			// @ts-expect-error
			'a/b'
		>
		type B = ReplaceInvalidSegment<Users, `b/h/${number}`>
		type C = ReplaceInvalidSegment<Users, `b/h/${string}/s/${string}`>
		type D = ReplaceInvalidSegment<Users, `b/h/123`>
		type E = ReplaceInvalidSegment<Users, `b/h/${string}/s/abc`>

		IsTrue<IsSame<A, ErrorInvalidOrNeedNumericSegment>>()
		IsTrue<IsSame<B, ErrorNeedStringSegment>>()
		IsTrue<IsSame<C, ErrorInvalidOrNeedNumericSegment>>()
		IsTrue<IsSame<D, ErrorNeedStringSegment>>()
		IsTrue<IsSame<E, ErrorInvalidOrNeedNumericSegment>>()
	})
})
