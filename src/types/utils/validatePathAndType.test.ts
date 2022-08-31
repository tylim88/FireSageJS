import { ValidateFullPath } from './validatePathAndType'
import { Users } from '../../utilForTests'
import { IsSame, IsTrue } from './common'
import {
	ErrorNeedStringSegment,
	ErrorInvalidOrNeedNumericSegment,
} from '../error'

describe('test ReplaceInvalidLastSegment', () => {
	it('ReplaceInvalidLastSegment positive case', () => {
		type A = ValidateFullPath<Users, 'a'>
		type B = ValidateFullPath<Users, `b/h/${string}`>
		type C = ValidateFullPath<Users, `b/h/${string}/s/${number}`>
		type D = ValidateFullPath<Users, `b/h/abc`>
		type E = ValidateFullPath<Users, `b/h/${string}/s/123`>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	})

	it('ReplaceInvalidLastSegment negative case', () => {
		type A = ValidateFullPath<
			Users,
			// @ts-expect-error
			'a/b'
		>
		type B = ValidateFullPath<Users, `b/h/${number}`>
		type C = ValidateFullPath<Users, `b/h/${string}/s/${string}`>
		type D = ValidateFullPath<Users, `b/h/123`>
		type E = ValidateFullPath<Users, `b/h/${string}/s/abc`>

		IsTrue<IsSame<A, ErrorInvalidOrNeedNumericSegment>>()
		IsTrue<IsSame<B, ErrorNeedStringSegment>>()
		IsTrue<IsSame<C, ErrorInvalidOrNeedNumericSegment>>()
		IsTrue<IsSame<D, ErrorNeedStringSegment>>()
		IsTrue<IsSame<E, ErrorInvalidOrNeedNumericSegment>>()
	})
})
