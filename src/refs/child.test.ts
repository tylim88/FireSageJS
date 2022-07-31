import { usersCreator, initializeApp, Users } from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'

initializeApp()
const ref = usersCreator().ref
const child = usersCreator().child
describe('test ref', () => {
	it('test return type', () => {
		const a = child(ref('Users'), 'b/c')
		// @ts-expect-error
		const b = child(ref('Users/a'), '')
		// @ts-expect-error
		const c = child(ref('Users/b/c'), '')
		// @ts-expect-error
		const d = child(ref('Users/b/d/f/g'), '')
		const e = child(ref('Users/b/h'), 'anything')
		const f = child(ref('Users/b'), 'c')

		type A = typeof a
		type B = typeof b
		type C = typeof c
		type D = typeof d
		type E = typeof e
		type F = typeof f

		IsTrue<IsEqual<A, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<B, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<C, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<D, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h/anything'>>>()
		IsTrue<IsEqual<F, DatabaseReference<Users, 'b/c'>>>()
	})
})
