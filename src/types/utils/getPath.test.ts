import {
	GetAllRemovablePaths,
	GetAllPushAblePaths,
	GetAllPushAbleOnlyPaths,
	GetAllPseudoArrayPaths,
	GetFullPath,
} from './getPath'
import { IsTrue, IsSame } from '../tsUtils'
import { Users } from '../../utilForTests'

describe('test get path', () => {
	it('test get full path', () => {
		type A = GetFullPath<Users, 'b', string>
		type B = GetFullPath<Users, 'b/h', `${string}`>
		type C = GetFullPath<Users, 'b/h', `${number}`>
		type D = GetFullPath<Users, `b/h/${string}/m`, `${string}`>
		type E = GetFullPath<Users, `b/h/${string}/m`, `${number}`>
		type F = GetFullPath<Users, `b/h/${string}/s`, `${number}`>
		type G = GetFullPath<Users, `b/h/${string}/s`, `${string}`>

		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, never>>()
		IsTrue<IsSame<D, `b/h/${string}/m/${string}`>>()
		IsTrue<IsSame<E, never>>()
		IsTrue<IsSame<F, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<G, never>>()
	})
	it('test Get All Removable Path', () => {
		type A = GetAllRemovablePaths<Users>
		IsTrue<
			IsSame<
				A,
				| 'b/d'
				| 'b/d/k'
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
		>
	})

	it('test Get All Push Able Path', () => {
		IsTrue<IsSame<GetAllPushAblePaths<Users>, `b/h/${string}/m` | 'o'>>
	})

	it('test Get All Push Able Only Path', () => {
		IsTrue<IsSame<GetAllPushAbleOnlyPaths<Users>, `b/h/${string}/p` | 'q'>>
	})

	it('test Get All Pseudo Array Path', () => {
		IsTrue<IsSame<GetAllPseudoArrayPaths<Users>, `b/h/${string}/s` | 'u' | 'w'>>
	})
})
