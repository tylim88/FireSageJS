import {
	GetAllRemovablePaths,
	GetAllPushAblePaths,
	GetAllPushAbleOnlyPaths,
	GetAllNumericKeyRecordPaths,
	GetFullPath,
} from './getPath'
import { IsTrue, IsSame } from '../tsUtils'
import { Users, TopLevelRecord, TopLevelPushAbleOnly } from '../../utilForTests'
import {
	ErrorIsNotChildPathOf,
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
} from './error'

describe('test get path', () => {
	it('test get full path', () => {
		type A = GetFullPath<Users, 'b', string>
		type B = GetFullPath<Users, 'b/h', `${string}`>
		type C = GetFullPath<Users, 'b/h', `${number}`>
		type D = GetFullPath<Users, `b/h/${string}/m`, `${string}`>
		type E = GetFullPath<Users, `b/h/${string}/m`, `${number}`>
		type F = GetFullPath<Users, `b/h/${string}/s`, `${number}`>
		type G = GetFullPath<Users, `b/h/${string}/s`, `${string}`>
		type H = GetFullPath<Users, undefined, `${string}`>
		type A2 = GetFullPath<Users, 'b', 'abc'>
		type B2 = GetFullPath<Users, 'b/h', 'abc'>
		type C2 = GetFullPath<Users, 'b/h', '123'>
		type D2 = GetFullPath<Users, `b/h/abc/m`, `efg`>
		type L2 = GetFullPath<Users, `b/h/abc/m`, `123`>
		type M2 = GetFullPath<Users, `b/h/abc/s`, `123`>
		type N2 = GetFullPath<Users, `b/h/abc/s`, `efg`>
		type H2 = GetFullPath<Users, undefined, `a`>
		IsTrue<IsSame<A, ErrorIsNotChildPathOf<'b', string>>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, ErrorNeedStringKey>>()
		IsTrue<IsSame<D, `b/h/${string}/m/${string}`>>()
		IsTrue<IsSame<E, ErrorNeedStringKey>>()
		IsTrue<IsSame<F, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<G, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<H, ErrorIsNotChildPathOf<undefined, string>>>()
		IsTrue<IsSame<A2, ErrorIsNotChildPathOf<'b', 'abc'>>>()
		IsTrue<IsSame<B2, `b/h/abc`>>()
		IsTrue<IsSame<C2, ErrorNeedStringKey>>()
		IsTrue<IsSame<D2, `b/h/abc/m/efg`>>()
		IsTrue<IsSame<L2, ErrorNeedStringKey>>()
		IsTrue<IsSame<M2, `b/h/abc/s/123`>>()
		IsTrue<IsSame<N2, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<H2, 'a'>>()
	})

	it('test get full path with TopLevelRecord type', () => {
		type A = GetFullPath<TopLevelRecord, undefined, 'a'>
		type B = GetFullPath<TopLevelRecord, 'user1', 'a'>
		type A2 = GetFullPath<TopLevelRecord, undefined, `${string}`>
		type B2 = GetFullPath<TopLevelRecord, 'user1', string>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'user1/a'>>()
		IsTrue<IsSame<A2, string>>()
		IsTrue<IsSame<B2, ErrorInvalidOrNeedNumericKey>>()
	})

	it('test Get All Removable Path', () => {
		type A = GetAllRemovablePaths<Users>
		IsTrue<
			IsSame<
				A,
				| `b/h/${string}/l`
				| `b/h/${string}/m`
				| `b/h/${string}/p`
				| `b/h/${string}/s`
				| `b/h/${string}/m/${string}`
				| `b/h/${string}/m/${string}/n`
				| `b/h/${string}/p/${string}`
				| `b/h/${string}/p/${string}/r`
				| `b/h/${string}/s/${number}`
				| `b/h/${string}/s/${number}/t`
				| `o/${string}`
				| `u/${number}`
			>
		>()
	})

	it('test Get All Push Able Path', () => {
		IsTrue<IsSame<GetAllPushAblePaths<Users>, `b/h/${string}/m` | 'o'>>()
	})

	it('test Get All Push Able Only Path', () => {
		IsTrue<IsSame<GetAllPushAbleOnlyPaths<Users>, `b/h/${string}/p` | 'q'>>()
		IsTrue<IsSame<GetAllPushAbleOnlyPaths<TopLevelPushAbleOnly>, undefined>>()
	})

	it('test Get All Pseudo Array Path', () => {
		IsTrue<
			IsSame<GetAllNumericKeyRecordPaths<Users>, `b/h/${string}/s` | 'u' | 'w'>
		>()
	})
})
