import { set } from './set'
import {
	readAndExpect,
	generateRandomData,
	initializeApp,
	usersCreator,
} from '../utilForTests'

initializeApp()

const users = usersCreator()

describe('test set and get', () => {
	it('test root', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		await set(ref, data)
		await readAndExpect(data, ref, undefined)
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "a" node', async () => {
		const ref = users.ref('a')
		const data = generateRandomData().data
		await set(ref, data['a'])
		await readAndExpect(data, ref, 'a')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/c" node', async () => {
		const ref = users.ref('b/c')
		const data = generateRandomData().data
		await set(ref, data['b']['c'])
		await readAndExpect(data, ref, 'b/c')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.ref('b/d')
		const data = generateRandomData().data
		await set(ref, data['b']['d'])
		await readAndExpect(data, ref, 'b/d')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.ref('b/d/f/j')
		const data = generateRandomData().data
		await set(ref, data['b']['d']['f']['j'])
		await readAndExpect(data, ref, 'b/d/f/j')
		;() => {
			set(ref, data['a']) // no error because 'a' is numberic literal and 'j' is number
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/h" node', async () => {
		const ref = users.ref('b/h')
		const data = generateRandomData().data
		await set(ref, data['b']['h'])
		await readAndExpect(data, ref, 'b/h')
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
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = users.ref(`b/h/${randString}`)
		await set(ref, data['b']['h'][randString]!)
		await readAndExpect(data, ref, `b/h/${randString}`)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			set(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string' is boolean
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data)
		}
	})

	it('test child "a" node', async () => {
		const ref = users.child(users.ref(), 'a')
		const data = generateRandomData().data
		await set(ref, data['a'])
		await readAndExpect(data, ref, 'a')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/c" node', async () => {
		const ref = users.child(users.ref('b'), 'c')
		const data = generateRandomData().data
		await set(ref, data['b']['c'])
		await readAndExpect(data, ref, 'b/c')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.child(users.ref('b'), 'd')
		const data = generateRandomData().data
		await set(ref, data['b']['d'])
		await readAndExpect(data, ref, 'b/d')
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
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.child(users.ref('b/d'), 'f/j')
		const data = generateRandomData().data
		await set(ref, data['b']['d']['f']['j'])
		await readAndExpect(data, ref, 'b/d/f/j')
		;() => {
			set(ref, data['a']) // no error because 'a' is numberic literal and 'j' is number
			// @ts-expect-error
			set(ref, data['b']['c'])
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/h" node', async () => {
		const ref = users.child(users.ref(), 'b/h')
		const data = generateRandomData().data
		await set(ref, data['b']['h'])
		await readAndExpect(data, ref, 'b/h')
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
			set(ref, data)
			// @ts-expect-error
			set(ref, data['b']['h']['string']!)
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randString = rand.randString
		const data = rand.data
		const ref = users.child(users.ref(`b`), `h/${randString}`)
		await set(ref, data['b']['h'][randString]!)
		await readAndExpect(data, ref, `b/h/${randString}`)
		;() => {
			// @ts-expect-error
			set(ref, data['a'])
			set(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string' is boolean
			// @ts-expect-error
			set(ref, data['b']['d'])
			// @ts-expect-error
			set(ref, data['b']['d']['f']['j'])
			// @ts-expect-error
			set(ref, data['b']['h'])
			// @ts-expect-error
			set(ref, data)
		}
	})
})
