import { ReplaceInvalidLastSegment } from './replaceInvalidLastSegment'
import { Users } from '../utilForTests'
import { IsSame, IsTrue } from './utils'
import { ErrorLastSegmentNeedString } from './error'

describe('test ReplaceInvalidLastSegment', () => {
	it('positive test', () => {
		type A = ReplaceInvalidLastSegment<
			Users,
			// @ts-expect-error
			'a/b',
			never
		>
		type B = ReplaceInvalidLastSegment<Users, `b/h/${number}`, never>
		type C = ReplaceInvalidLastSegment<
			Users,
			`b/h/${string}/s/${string}`,
			never
		>
		type D = ReplaceInvalidLastSegment<Users, `b/h/1`, never>
		type E = ReplaceInvalidLastSegment<Users, `b/h/${string}/s/abc`, never>

		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, ErrorLastSegmentNeedString<`b/h/${string}`>>>()
		IsTrue<IsSame<C, never>>()
		IsTrue<IsSame<D, ErrorLastSegmentNeedString<`b/h/${string}`>>>()
		IsTrue<IsSame<E, never>>()
	})
})
