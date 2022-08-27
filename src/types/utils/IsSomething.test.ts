import { IsValidKey } from './IsSomething'
import { IsTrue, IsSame } from './common'

describe('test IsSomething', () => {
	it('test IsValidKey', () => {
		type A = IsValidKey<'abc'>
		type B = IsValidKey<'123'>
		type C = IsValidKey<'a/'>
		type D = IsValidKey<'a[h'>
		type E = IsValidKey<']l'>
		type F = IsValidKey<'7.l#p'>
		type G = IsValidKey<'$', '$'>
		type H = IsValidKey<''>

		IsTrue<IsSame<A, true>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, false>>()
	})
})
