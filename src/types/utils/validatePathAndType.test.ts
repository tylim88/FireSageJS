import {
	ValidateFullPath,
	ValidateChildPath,
	ValidateRecordStringNumber,
} from './validatePathAndType'
import { Users } from '../../utilForTests'
import { IsSame, IsTrue } from '../tsUtils'
import {
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
	ErrorNoInValidCharacter,
	ErrorHasNoChild,
	ErrorNeedNumericKey,
	ErrorNeedNoNNumericKey,
} from './error'

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
		type H = ValidateFullPath<Users, `b/h/${string}/s/abc/k`>
		type I = ValidateFullPath<Users, `b/h/123`>
		type J = ValidateFullPath<Users, `b/h/123/z`> // this case need granular error message
		IsTrue<IsSame<A, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<B, ErrorNeedStringKey>>()
		IsTrue<IsSame<C, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<D, ErrorNeedStringKey>>()
		IsTrue<IsSame<E, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<F, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<G, ErrorNoInValidCharacter>>()
		IsTrue<IsSame<H, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<I, ErrorNeedStringKey>>()
		IsTrue<IsSame<J, ErrorInvalidOrNeedNumericKey>>()
	})

	it('ValidateChildPath negative case', () => {
		type A = ValidateChildPath<Users, 'a', 'abc'>
		type B = ValidateChildPath<Users, `b/h/${string}`, 'z'>
		type C = ValidateChildPath<Users, `b/h/${string}/s/${number}`, 'k'>
		type D = ValidateChildPath<Users, `b/h/abc`, 'z'>
		type E = ValidateChildPath<Users, `b/h/${string}/s/123`, 'k'>
		type F = ValidateChildPath<Users, undefined, never>
		type G = ValidateChildPath<Users, `b/h/123`, 'z'>
		type H = ValidateChildPath<Users, `b/h/${string}/s/abc`, 'k'>
		type I = ValidateChildPath<Users, `b/h/123`, 'i'>
		type J = ValidateChildPath<Users, `b/h/${string}/s/abc`, 't'>
		type K = ValidateChildPath<Users, `u`, 'abc'>
		type L = ValidateChildPath<Users, `b/h/${string}/s/`, 't'> // this case need granular error message
		type M = ValidateChildPath<Users, 'q', ''>

		IsTrue<IsSame<A, ErrorHasNoChild<'a'>>>()
		IsTrue<IsSame<B, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<C, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<D, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<E, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<F, never>>()
		IsTrue<IsSame<G, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<H, ErrorHasNoChild<`b/h/${string}/s/abc`>>>()
		IsTrue<IsSame<I, ErrorNeedStringKey>>()
		IsTrue<IsSame<J, ErrorHasNoChild<`b/h/${string}/s/abc`>>>()
		IsTrue<IsSame<K, ErrorInvalidOrNeedNumericKey>>()
		IsTrue<IsSame<L, ErrorHasNoChild<`b/h/${string}/s/`>>>()
		IsTrue<IsSame<M, ErrorNoInValidCharacter>>()
	})

	it('ValidateRecordString tests', () => {
		type A = ValidateRecordStringNumber<number, Record<number, unknown>>
		type B = ValidateRecordStringNumber<
			Record<string, unknown>,
			Record<number, unknown>
		>
		type C = ValidateRecordStringNumber<Record<string, unknown>, null>
		type D = ValidateRecordStringNumber<null, Record<string, unknown>>
		type E = ValidateRecordStringNumber<
			Record<number, unknown>,
			Record<string, unknown>
		>

		IsTrue<IsSame<A, Record<number, unknown>>>()
		IsTrue<IsSame<B, ErrorNeedNumericKey>>()
		IsTrue<IsSame<C, null>>()
		IsTrue<IsSame<D, Record<string, unknown>>>()
		IsTrue<IsSame<E, ErrorNeedNoNNumericKey>>()
	})
})
