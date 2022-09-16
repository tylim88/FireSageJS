import { IsCharacterValid, IsRecordString } from './isSomething'
import { IsTrue, IsSame } from '../tsUtils'

describe('test IsSomething', () => {
	it('test IsValidKey', () => {
		type A = IsCharacterValid<'abc', true, false>
		type B = IsCharacterValid<'123', true, false>
		type C = IsCharacterValid<'a/', true, false>
		type D = IsCharacterValid<'a[h', true, false>
		type E = IsCharacterValid<']l', true, false>
		type F = IsCharacterValid<'7.l#p', true, false>
		type G = IsCharacterValid<'$', true, false, '$'>
		type H = IsCharacterValid<'', true, false>
		type I = IsCharacterValid<string, true, false>
		type J = IsCharacterValid<`${string}`, true, false>
		type K = IsCharacterValid<`abc/${string}`, true, false, '/'>

		IsTrue<IsSame<A, true>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, false>>()
		IsTrue<IsSame<I, true>>()
		IsTrue<IsSame<J, true>>()
		IsTrue<IsSame<K, true>>()
	})

	it('test IsRecordString', () => {
		type A = IsRecordString<'abc'>
		type B = IsRecordString<boolean>
		type C = IsRecordString<Record<number, unknown>>
		type D = IsRecordString<Record<string, unknown>>
		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, false>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, true>>()
	})
})
