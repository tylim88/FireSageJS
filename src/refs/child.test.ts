import {
	usersCreator,
	initializeApp,
	Users,
	readAndExpectSet,
	generateRandomData,
} from '../utilForTests'
import { IsEqual, IsTrue, DatabaseReference } from '../types'
import { child } from './child'
import { set } from '../operations'

initializeApp()
const users = usersCreator()

describe('test ref', () => {
	it('test return type', () => {
		expect(() => {
			const a = child(users.ref(), 'b/c')
			const b = child(
				users.ref(),
				// @ts-expect-error
				undefined
			)
			const c = child(
				users.ref('b/c'),
				// @ts-expect-error
				''
			)
			const d = child(
				users.ref('b/d/f/j'),
				// @ts-expect-error
				''
			)
			const e = child(users.ref('b/h'), 'anything')
			const f = child(users.ref('b'), 'c')

			type A = typeof a
			type B = typeof b
			type C = typeof c
			type D = typeof d
			type E = typeof e
			type F = typeof f

			IsTrue<IsEqual<A, DatabaseReference<Users, 'b/c'>>>()
			IsTrue<
				IsEqual<B, DatabaseReference<Users, keyof Users['flatten_write']>>
			>()
			IsTrue<IsEqual<C, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<D, DatabaseReference<Users, never>>>()
			IsTrue<IsEqual<E, DatabaseReference<Users, 'b/h/anything'>>>()
			IsTrue<IsEqual<F, DatabaseReference<Users, 'b/c'>>>()
		}).toThrow()
	})
})

describe('test child runtime', () => {
	it('test child "a" node', async () => {
		const ref = child(users.ref(), 'a')
		const data = generateRandomData().data
		await set(ref, data['a'])
		await readAndExpectSet(ref, 'a', data)
		;() => {
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/c" node', async () => {
		const ref = child(users.ref('b'), 'c')
		const data = generateRandomData().data
		await set(ref, data['b']['c'])
		await readAndExpectSet(ref, 'b/c', data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/d" node', async () => {
		const ref = child(users.ref('b'), 'd')
		const data = generateRandomData().data
		await set(ref, data['b']['d'])
		await readAndExpectSet(ref, 'b/d', data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = child(users.ref('b/d'), 'f/j')
		const data = generateRandomData().data
		await set(ref, data['b']['d']['f']['j'])
		await readAndExpectSet(ref, 'b/d/f/j', data)
		;() => {
			set(ref, data['a']) // no error because 'a' is numeric literal and 'j' is number
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(users.ref(), `b/h/${randStringHKey}`)
		await set(ref, data['b']['h'][randStringHKey]!)
		await readAndExpectSet(ref, `b/h/${randStringHKey}`, data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/h/string/m" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = child(users.ref(`b`), `h/${randStringHKey}/m`)
		await set(ref, data['b']['h'][randStringHKey]!['m'])
		await readAndExpectSet(ref, `b/h/${randStringHKey}/m`, data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/h/string/m/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const ref = child(users.ref(), `b/h/${randStringHKey}/m/${randStringMKey}`)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!)
		await readAndExpectSet(
			ref,
			`b/h/${randStringHKey}/m/${randStringMKey}`,
			data
		)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			set(ref, data['b']['h']['string']!['m']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
	it('test "b/h/string/m/string/n" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const ref = child(
			users.ref('b/h'),
			`${randStringHKey}/m/${randStringMKey}/n`
		)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n'])
		await readAndExpectSet(
			ref,
			`b/h/${randStringHKey}/m/${randStringMKey}/n`,
			data
		)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['i'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!['m']['string']!)
			set(ref, data['b']['h']['string']!['m']['string']!['n'])
		}
	})
})
