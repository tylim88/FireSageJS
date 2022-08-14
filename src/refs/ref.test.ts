import { usersCreator, initializeApp, Users } from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'

initializeApp()
const ref = usersCreator().ref
describe('test ref', () => {
	it('test return type', () => {
		const a = ref()
		const b = ref('a')
		const c = ref('b')
		const d = ref('b/d/f/j')
		const e = ref('b/h')

		type A = typeof a
		type B = typeof b
		type C = typeof c
		type D = typeof d
		type E = typeof e

		IsTrue<IsEqual<A, DatabaseReference<Users, undefined>>>()
		IsTrue<IsEqual<B, DatabaseReference<Users, 'a'>>>()
		IsTrue<IsEqual<C, DatabaseReference<Users, 'b'>>>()
		IsTrue<IsEqual<D, DatabaseReference<Users, 'b/d/f/j'>>>()
		IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h'>>>()

		type A_key = A['key']
		type B_key = B['key']
		type C_key = C['key']
		type D_key = D['key']
		type E_key = E['key']

		IsTrue<IsEqual<A_key, null>>()
		IsTrue<IsEqual<B_key, 'a'>>()
		IsTrue<IsEqual<C_key, 'b'>>()
		IsTrue<IsEqual<D_key, 'j'>>()
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
	it('test path type', () => {
		const _123 = 123 as number
		const abc = 'abc' as string
		;() => {
			const a = ref()
			const b = ref('a')
			const c = ref('b')
			const d = ref('b/d/f/j')
			const e = ref('b/h')
			const f = ref('b/h/abc')
			// @ts-expect-error
			const g = ref('b/h/123')
			const h = ref('b/h/abc/s/123')
			// @ts-expect-error
			const i = ref('b/h/abc/s/efg')
			const j = ref(`b/h/${abc}`)
			// @ts-expect-error
			const k = ref(`b/h/${_123}`)
			const l = ref(`b/h/abc/s/${_123}`)
			// @ts-expect-error
			const m = ref(`b/h/abc/s/${abc}`)

			type A = typeof a
			type B = typeof b
			type C = typeof c
			type D = typeof d
			type E = typeof e
			type F = typeof f
			type G = typeof g
			type H = typeof h
			type I = typeof i
			type J = typeof j
			type K = typeof k
			type L = typeof l
			type M = typeof m

			IsTrue<IsEqual<A, DatabaseReference<Users, undefined>>>()
			IsTrue<IsEqual<B, DatabaseReference<Users, 'a'>>>()
			IsTrue<IsEqual<C, DatabaseReference<Users, 'b'>>>()
			IsTrue<IsEqual<D, DatabaseReference<Users, 'b/d/f/j'>>>()
			IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h'>>>()
			IsTrue<IsEqual<F, DatabaseReference<Users, 'b/h/abc'>>>()
			IsTrue<IsEqual<G, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<H, DatabaseReference<Users, `b/h/abc/s/123`>>>()
			IsTrue<IsEqual<I, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<J, DatabaseReference<Users, `b/h/${string}`>>>()
			IsTrue<IsEqual<K, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<L, DatabaseReference<Users, `b/h/abc/s/${number}`>>>()
			IsTrue<IsEqual<M, DatabaseReference<Users, never>>>()
		}
	})
})
