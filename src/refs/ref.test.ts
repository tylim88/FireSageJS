import { usersCreator, initializeApp, Users } from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'
console.log(1)
initializeApp()
const ref = usersCreator().ref
describe('test ref', () => {
	it('test return type', () => {
		const a = ref('Users')
		const b = ref('Users/a')
		const c = ref('Users/b')
		const d = ref('Users/b/d/f/g')
		const e = ref('Users/b/h')

		type A = typeof a
		type B = typeof b
		type C = typeof c
		type D = typeof d
		type E = typeof e

		IsTrue<IsEqual<A, DatabaseReference<Users, null>>>()
		IsTrue<IsEqual<B, DatabaseReference<Users, 'a'>>>()
		IsTrue<IsEqual<C, DatabaseReference<Users, 'b'>>>()
		IsTrue<IsEqual<D, DatabaseReference<Users, 'b/d/f/g'>>>()
		IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h'>>>()

		type A_key = A['key']
		type B_key = B['key']
		type C_key = C['key']
		type D_key = D['key']
		type E_key = E['key']

		IsTrue<IsEqual<A_key, null>>()
		IsTrue<IsEqual<B_key, 'a'>>()
		IsTrue<IsEqual<C_key, 'b'>>()
		IsTrue<IsEqual<D_key, 'g'>>()
		IsTrue<IsEqual<E_key, 'h'>>()

		type A_parent = A['parent']
		type B_parent = B['parent']
		type C_parent = C['parent']
		type D_parent = D['parent']
		type E_parent = E['parent']

		IsTrue<IsEqual<A_parent, null>>()
		IsTrue<IsEqual<B_parent, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<C_parent, DatabaseReference<Users, never>>>()
		IsTrue<IsEqual<D_parent, DatabaseReference<Users, 'b/d/f'>>>()
		IsTrue<IsEqual<E_parent, DatabaseReference<Users, 'b'>>>()
	})
})
