import {
	usersRef,
	initializeApp,
	Users,
	readAndExpectForSet,
	generateRandomData,
} from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'
import { child } from './child'
import { set } from '../operations'

initializeApp()

describe('test ref', () => {
	it('test path type validation and return type', () => {
		expect(() => {
			const _123 = 123 as number
			const abc = 'abc' as string

			const a = child(usersRef(), 'b/c')

			const b = child(
				usersRef(),
				// @ts-expect-error
				undefined // this will throw
			)

			const c = child(
				usersRef('b/c'),
				// @ts-expect-error
				''
			)

			const d = child(
				usersRef('b/d/f/j'),
				// @ts-expect-error
				''
			)

			const e = child(usersRef('b'), 'c')

			const f = child(usersRef('b/h'), 'anything')
			const g = child(
				usersRef('b/h'),
				// @ts-expect-error
				'123'
			)
			const h = child(usersRef(`b/h/abc/s`), '123')
			const i = child(
				usersRef(`b/h/abc/s`),
				// @ts-expect-error
				'abc'
			)
			const j = child(usersRef('b/h'), abc)
			const k = child(
				usersRef('b/h'),
				// @ts-expect-error
				`${_123}`
			)
			const l = child(usersRef(`b/h/abc/s`), `${_123}`)
			const m = child(
				usersRef(`b/h/abc/s`),
				// @ts-expect-error
				abc
			)

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

			IsTrue<IsEqual<A, DatabaseReference<Users, 'b/c'>>>()
			IsTrue<IsEqual<B, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<C, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<D, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<E, DatabaseReference<Users, 'b/c'>>>()
			IsTrue<IsEqual<F, DatabaseReference<Users, 'b/h/anything'>>>()
			IsTrue<IsEqual<G, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<H, DatabaseReference<Users, `b/h/abc/s/123`>>>()
			IsTrue<IsEqual<I, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<J, DatabaseReference<Users, `b/h/${string}`>>>()
			IsTrue<IsEqual<K, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<L, DatabaseReference<Users, `b/h/abc/s/${number}`>>>()
			IsTrue<IsEqual<M, DatabaseReference<Users, never>>>()
		}).toThrow()
	})
})

describe('test child runtime', () => {
	it('test child "a" node', async () => {
		const ref = child(usersRef(), 'a')
		const data = generateRandomData().data
		await set(ref, data['a'])
		await readAndExpectForSet(ref, 'a', data)
		;() => {
			set(
				ref, // @ts-expect-error
				data
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/c" node', async () => {
		const ref = child(usersRef('b'), 'c')
		const data = generateRandomData().data
		await set(ref, data['b']['c'])
		await readAndExpectForSet(ref, 'b/c', data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/d" node', async () => {
		const ref = child(usersRef('b'), 'd')
		const data = generateRandomData().data
		await set(ref, data['b']['d'])
		await readAndExpectForSet(ref, 'b/d', data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/d/f/j" node', async () => {
		const ref = child(usersRef('b/d'), 'f/j')
		const data = generateRandomData().data
		await set(ref, data['b']['d']['f']['j'])
		await readAndExpectForSet(ref, 'b/d/f/j', data)
		;() => {
			set(ref, data['a']) // 'j' is number
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref,
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t'] // 'j' is number
			)
		}
	})

	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef(), `b/h/${randStringHKey}`)
		await set(ref, data['b']['h'][randStringHKey]!)
		await readAndExpectForSet(ref, `b/h/${randStringHKey}`, data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(ref, data['b']['h']['string']!)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/m" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef(`b`), `h/${randStringHKey}/m`)
		await set(ref, data['b']['h'][randStringHKey]!['m'])
		await readAndExpectForSet(ref, `b/h/${randStringHKey}/m`, data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(ref, data['b']['h']['string']!['m'])
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/m/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const ref = child(usersRef(), `b/h/${randStringHKey}/m/${randStringMKey}`)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!)
		await readAndExpectForSet(
			ref,
			`b/h/${randStringHKey}/m/${randStringMKey}`,
			data
		)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(ref, data['b']['h']['string']!['m']['string']!)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/m/string/n" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const ref = child(
			usersRef('b/h'),
			`${randStringHKey}/m/${randStringMKey}/n`
		)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n'])
		await readAndExpectForSet(
			ref,
			`b/h/${randStringHKey}/m/${randStringMKey}/n`,
			data
		)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/p" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef(`b`), `h/${randStringHKey}/p`)
		;() =>
			set(
				ref,
				// @ts-expect-error
				data['b']['h'][randStringHKey]!['p']
			)
	})

	it('test "b/h/string/p/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const ref = child(usersRef(), `b/h/${randStringHKey}/p/${randStringPKey}`)
		await set(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!)
		await readAndExpectForSet(
			ref,
			`b/h/${randStringHKey}/p/${randStringPKey}`,
			data
		)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(ref, data['b']['h']['string']!['p']['string']!)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/p/string/r" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const ref = child(
			usersRef('b/h'),
			`${randStringHKey}/p/${randStringPKey}/r`
		)
		await set(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!['r'])
		await readAndExpectForSet(
			ref,
			`b/h/${randStringHKey}/p/${randStringPKey}/r`,
			data
		)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(ref, data['b']['h']['string']!['p']['string']!['r'])
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/s" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef(`b`), `h/${randStringHKey}/s`)
		await set(
			ref,
			data['b']['h'][randStringHKey]!['s'] as
				| {
						[x: `${number}`]: {
							t: number
						}
				  }
				| {
						t: number
				  }[]
		)
		await readAndExpectForSet(ref, `b/h/${randStringHKey}/s`, data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(ref, data['b']['h']['string']!['s'])
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/s/numeric" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef(), `b/h/${randStringHKey}/s/0`)
		await set(
			ref,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!
		)
		await readAndExpectForSet(ref, `b/h/${randStringHKey}/s/0`, data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']['f']['j']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(ref, (data['b']['h']['string']!['s'] as { t: number }[])[0]!)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']
			)
		}
	})

	it('test "b/h/string/s/numeric/t" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(usersRef('b/h'), `${randStringHKey}/s/0/t`)
		await set(
			ref,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!['t']
		)
		await readAndExpectForSet(ref, `b/h/${randStringHKey}/s/0/t`, data)
		;() => {
			set(ref, data['a']) // b/h/string/s/numeric/t is number
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(ref, data['b']['d']['f']['j']) // b/h/string/s/numeric/t is number
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['i']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['m']['string']!['n']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['p']['string']!['r']
			)
			set(
				ref, // @ts-expect-error
				data['b']['h']['string']!['s'] as { t: number }[]
			)
			set(
				ref, // @ts-expect-error
				(data['b']['h']['string']!['s'] as { t: number }[])[0]!
			)
			set(ref, (data['b']['h']['string']!['s'] as { t: number }[])[0]!['t'])
		}
	})
})
