import { IsValidKey } from './IsSomething'
import { IsTrue, IsSame } from '../tsUtils'

describe('test IsSomething', () => {
	it('test IsValidKey', () => {
		type A = IsValidKey<'abc', true, false>
		type B = IsValidKey<'123', true, false>
		type C = IsValidKey<'a/', true, false>
		type D = IsValidKey<'a[h', true, false>
		type E = IsValidKey<']l', true, false>
		type F = IsValidKey<'7.l#p', true, false>
		type G = IsValidKey<'$', true, false, '$'>
		type H = IsValidKey<'', true, false>
		type I = IsValidKey<string, true, false>

		IsTrue<IsSame<A, true>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, false>>()
		IsTrue<IsSame<I, true>>()
	})
})
