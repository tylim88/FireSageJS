import { users, initializeApp, Users } from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'

initializeApp()
const ref = users.ref
const child = users.child
describe('test ref', () => {
	it('test return type', () => {
		const a = child(ref('Users'), 'b/c')
		const b = child(ref('Users/a'), 'b/c')
		const c = child(ref('Users/b/c'), 'b/c')
		const d = child(ref('Users/b/d/f/g'), 'b/c')
		const e = child(ref('Users/b/h'), 'b/c')

		type A = typeof a
		type B = typeof b
		type C = typeof c
		type D = typeof d
		type E = typeof e

		IsTrue<IsEqual<A, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<B, DatabaseReference<Users, 'a'>>>()
		IsTrue<IsEqual<C, DatabaseReference<Users, 'b/c'>>>()
		IsTrue<IsEqual<D, DatabaseReference<Users, 'b/d/f/g'>>>()
		IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h'>>>()
	})
})
