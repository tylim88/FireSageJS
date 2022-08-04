import { set } from './set'
import {
	readAndExpectSet,
	generateRandomData,
	initializeApp,
	usersCreator,
} from '../utilForTests'
import { child } from '../refs'

initializeApp()

const users = usersCreator()

describe('test set and get', () => {
	it('test root', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		await set(ref, data)
		await readAndExpectSet(ref, undefined, data)
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
		}
	})
	it('test "a" node', async () => {
		const ref = users.ref('a')
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
		}
	})
	it('test "b/c" node', async () => {
		const ref = users.ref('b/c')
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
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.ref('b/d')
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
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.ref('b/d/f/j')
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
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = users.ref(`b/h/${randString}`)
		await set(ref, data['b']['h'][randString]!)
		await readAndExpectSet(ref, `b/h/${randString}`, data)
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
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = users.ref(`b/h/${randString}/i`)
		await set(ref, data['b']['h'][randString]!['i'])
		await readAndExpectSet(ref, `b/h/${randString}/i`, data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			set(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string/i' is boolean
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			set(ref, data['b']['h']['string']!['i'])
		}
	})

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
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = child(users.ref(), `b/h/${randString}`)
		await set(ref, data['b']['h'][randString]!)
		await readAndExpectSet(ref, `b/h/${randString}`, data)
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
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = child(users.ref(`b`), `h/${randString}/i`)
		await set(ref, data['b']['h'][randString]!['i'])
		await readAndExpectSet(ref, `b/h/${randString}/i`, data)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			set(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string/i' is boolean
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
			set(ref, data['b']['h']['string']!['i'])
		}
	})
})
