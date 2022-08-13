import { ReplaceInvalidLastSegment } from './replaceInvalidLastSegment'
import { Users } from '../utilForTests'
import { IsSame, IsTrue } from './utils'
import { ErrorLastSegmentNeedString, ErrorLastSegmentNeedNumber } from './error'

describe('test ReplaceInvalidLastSegment', () => {
	it('positive test', () => {
		type A = ReplaceInvalidLastSegment<Users, 'a', 'a/b'>
		type B = ReplaceInvalidLastSegment<Users, `b/h/${string}`, `b/h/${number}`>
		type C = ReplaceInvalidLastSegment<
			Users,
			`b/h/${string}/s/${number}`,
			`b/h/${string}/s/${string}`
		>
		type D = ReplaceInvalidLastSegment<Users, `b/h/${string}`, `b/h/1`>
		type E = ReplaceInvalidLastSegment<
			Users,
			`b/h/${string}/s/${number}`,
			`b/h/${string}/s/abc`
		>

		IsTrue<IsSame<A, 'a/b'>>()
		IsTrue<IsSame<B, ErrorLastSegmentNeedString<`b/h/${string}`>>>()
		IsTrue<IsSame<C, ErrorLastSegmentNeedNumber<`b/h/${string}/s/${number}`>>>()
		IsTrue<IsSame<D, ErrorLastSegmentNeedString<`b/h/${string}`>>>()
		IsTrue<IsSame<E, ErrorLastSegmentNeedNumber<`b/h/${string}/s/${number}`>>>()
	})
})
