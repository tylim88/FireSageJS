import { ObjectFlattenHybrid, DeepKeyHybrid } from './objectFlatten'
import { IsEqual, IsTrue } from './utils'
import { Users } from '../utilForTests'
import { ReplaceInvalidData } from './replaceInvalidData'

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
			IsEqual<
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
	it('positive complex data structure', () => {
		type A = Users['root']
		type B = ObjectFlattenHybrid<ReplaceInvalidData<A>>

		IsTrue<
			IsEqual<
				B,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d: {
							e: 'abc'
							f: {
								j: number
							}
							'f/j': number
							k: string
						}
						h: Record<string, boolean>
						'd/e': 'abc'
						'd/f': {
							j: number
						}
						'd/f/j': number
						'd/k': string
					}
					'b/c': true
					'b/d': {
						e: 'abc'
						f: {
							j: number
						}
						'f/j': number
						k: string
					}
					'b/d/e': 'abc'
					'b/d/f': {
						j: number
					}
					'b/d/f/j': number
					'b/d/k': string
					'b/h': Record<string, boolean>
				}
			>
		>
	})
	it('test primitive type', () => {
		type A = false | null | string | number
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsEqual<B[], A[]>>
	})
	it('test unknown type', () => {
		type A = unknown
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsEqual<B[], A[]>>
	})
	it('test never type', () => {
		type A = never
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsEqual<B[], A[]>>
	})
})
