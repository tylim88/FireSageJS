import { ObjectFlattenHybrid } from './objectFlatten'
import { IsEqual, IsTrue } from './utils'
import { Users } from '../utilForTests'
import { ReplaceInvalidData } from './replaceInvalidData'

describe('test object flatten type', () => {
	it('positive test 1', () => {
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
	it('positive test 2', () => {
		type A = false | null | string | number
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsEqual<B[], A[]>>
	})
	it('positive test 3', () => {
		type A = unknown
		type B = ObjectFlattenHybrid<A>

		IsTrue<IsEqual<B[], A[]>>
	})
})
