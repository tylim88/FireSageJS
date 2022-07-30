import { ObjectFlattenHybrid } from './objectFlatten'
import { IsEqual, IsTrue } from './utils'
import { Users } from '../utilForTests'
describe('test object flatten type', () => {
	it('positive test 1', () => {
		type A = Users['root']
		type B = ObjectFlattenHybrid<A>

		IsTrue<
			IsEqual<
				B,
				{
					a: 1
					b: {
						c: true
						d: {
							e: 'abc'
							f: {
								g: null
							}
							'f/g': null
						}
						'd/e': 'abc'
						'd/f': {
							g: null
						}
						'd/f/g': null
					}
					'b/c': true
					'b/d': {
						e: 'abc'
						f: {
							g: null
						}
						'f/g': null
					}
					'b/d/e': 'abc'
					'b/d/f': {
						g: null
					}
					'b/d/f/g': null
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
