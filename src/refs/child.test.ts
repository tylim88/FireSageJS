import { usersCreator, initializeApp, Users } from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'

initializeApp()
const ref = usersCreator().ref
const child = usersCreator().child
describe('test ref', () => {
	it('test return type', () => {
		expect(() => {
			const a = child(ref(), 'b/c')
			const b = child(
				ref('a'),
				// @ts-expect-error
				''
			)
			const c = child(
				ref('b/c'),
				// @ts-expect-error
				''
			)
			const d = child(
				ref('b/d/f/g'),
				// @ts-expect-error
				''
			)
			const e = child(ref('b/h'), 'anything')
			const f = child(ref('b'), 'c')

			type A = typeof a
			type B = typeof b
			type C = typeof c
			type D = typeof d
			type E = typeof e
			type F = typeof f

			IsTrue<IsEqual<A, DatabaseReference<Users, 'b/c'>>>()
			IsTrue<IsEqual<B, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<C, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<D, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h/anything'>>>()
			IsTrue<IsEqual<F, DatabaseReference<Users, 'b/c'>>>()
		}).toThrow()
	})
})
