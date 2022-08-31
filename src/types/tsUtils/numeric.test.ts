import { IsAGreaterThanB, CreateArrayWithLengthX } from './numeric'
import { IsSame, IsTrue } from './is'

describe('test numeric', () => {
	it('test IsAGreaterThanB', () => {
		type A = IsAGreaterThanB<
			CreateArrayWithLengthX<0>,
			CreateArrayWithLengthX<0>
		>
		type B = IsAGreaterThanB<
			CreateArrayWithLengthX<4>,
			CreateArrayWithLengthX<4>
		>
		type C = IsAGreaterThanB<
			CreateArrayWithLengthX<0>,
			CreateArrayWithLengthX<1>
		>
		type D = IsAGreaterThanB<
			CreateArrayWithLengthX<10>,
			CreateArrayWithLengthX<1>
		>
		type E = IsAGreaterThanB<
			CreateArrayWithLengthX<99>,
			CreateArrayWithLengthX<100>
		>
		type F = IsAGreaterThanB<
			CreateArrayWithLengthX<100>,
			CreateArrayWithLengthX<100>
		>
		type G = IsAGreaterThanB<
			CreateArrayWithLengthX<101>,
			CreateArrayWithLengthX<100>
		>

		IsTrue<IsSame<A, 'equal'>>()
		IsTrue<IsSame<B, 'equal'>>()
		IsTrue<IsSame<C, 'lesser'>>()
		IsTrue<IsSame<D, 'greater'>>()
		IsTrue<IsSame<E, 'lesser'>>()
		IsTrue<IsSame<F, 'equal'>>()
		IsTrue<IsSame<G, 'greater'>>()
	})
})
