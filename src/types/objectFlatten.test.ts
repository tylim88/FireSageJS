import { ObjectFlattenHybrid, DeepKeyHybrid } from './objectFlatten'
import { IsTrue, IsSame } from './utils'

describe('test object flatten type', () => {
	it('test DeepKeyHybrid', () => {
		type A = DeepKeyHybrid<
			{
				a: 1
				b: {
					c: 2
					d: {
						e: 5
						f: Record<string, boolean>
						g: Record<string, Record<string, { i: 1 }>>
					}
				}
			},
			'write'
		>

		IsTrue<
			IsSame<
				A,
				| 'a'
				| 'b'
				| 'b/c'
				| 'b/d'
				| 'b/d/e'
				| 'b/d/f'
				| `b/d/f/${string}`
				| 'b/d/g'
				| `b/d/g/${string}`
				| `b/d/g/${string}/${string}`
				| `b/d/g/${string}/${string}/i`
			>
		>
	})

	it('test primitive type', () => {
		type A = false | null | string | number
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
	it('test unknown type', () => {
		type A = unknown
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
	it('test never type', () => {
		type A = never
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsSame<B[], A[]>>
	})
})
