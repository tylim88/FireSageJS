import {
	GetAllRemovablePaths,
	GetAllPushAblePaths,
	GetAllPushAbleOnlyPaths,
	GetAllPseudoArrayPaths,
} from './getPath'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'

describe('test', () => {
	it('test Get All Removable Path', () => {
		type A = GetAllRemovablePaths<Users>
		IsTrue<
			IsSame<
				A,
				| 'b/d'
				| 'b/d/k'
				| `b/h/${string}/l`
				| `b/h/${string}/m`
				| `b/h/${string}/m/${string}/n`
				| `b/h/${string}/p`
				| `b/h/${string}/p/${string}/r`
				| `b/h/${string}/s`
				| `b/h/${string}/s/${number}/t`
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
		IsTrue<IsSame<GetAllPseudoArrayPaths<Users>, `b/h/${string}/s` | 'u'>>
	})
})
