import { ValidateFullPath, ValidateChildPath } from './validatePathAndType'
import { Users } from '../../utilForTests'
import { IsSame, IsTrue } from '../tsUtils'
import {
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
	ErrorNoInValidCharacter,
} from './error'
import { ErrorHasNoChild } from '../error'

describe('test ValidateFullPath', () => {
	it('ValidateFullPath positive case', () => {
		type A = ValidateFullPath<Users, 'a'>
		type B = ValidateFullPath<Users, `b/h/${string}`>
		type C = ValidateFullPath<Users, `b/h/${string}/s/${number}`>
		type D = ValidateFullPath<Users, `b/h/abc`>
		type E = ValidateFullPath<Users, `b/h/${string}/s/123`>
		type F = ValidateFullPath<Users, undefined>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
		IsTrue<IsSame<F, undefined>>()
	})

	it('ValidateFullPath negative case', () => {
		type A = ValidateFullPath<Users, 'a/b'>
		type B = ValidateFullPath<Users, `b/h/${number}`>
		type C = ValidateFullPath<Users, `b/h/${string}/s/${string}`>
		type D = ValidateFullPath<Users, `b/h/123`>
		type E = ValidateFullPath<Users, `b/h/${string}/s/abc`>
		type F = ValidateFullPath<Users, `b/h/${string}/s/`>
		type G = ValidateFullPath<Users, ``>
		IsTrue<IsSame<A, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<B, ErrorNeedStringKey>>()
		IsTrue<IsSame<C, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<D, ErrorNeedStringKey>>()
		IsTrue<IsSame<E, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<F, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<G, ErrorNoInValidCharacter>>()
	})

	// it('ValidateChildPath negative case', () => {
	// 	type A = ValidateChildPath<Users, 'a', 'abc'>
	// 	type B = ValidateChildPath<Users, `b/h/${string}`, 'z'>
	// 	type C = ValidateChildPath<Users, `b/h/${string}/s/${number}`>
	// 	type D = ValidateChildPath<Users, `b/h/abc`>
	// 	type E = ValidateChildPath<Users, `b/h/${string}/s/123`>
	// 	type F = ValidateChildPath<Users, undefined>

	// 	IsTrue<IsSame<A, ErrorHasNoChild<'a'>>>()
	// 	IsTrue<IsSame<B, `b/h/${string}`>>()
	// 	IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
	// 	IsTrue<IsSame<D, `b/h/abc`>>()
	// 	IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	// 	IsTrue<IsSame<F, undefined>>()
	// })
})
