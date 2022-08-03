// import { update } from './update'
// import {
// 	readAndExpect,
// 	generateRandomData,
// 	initializeApp,
// 	usersCreator,
// } from '../utilForTests'

// initializeApp()

// const users = usersCreator()

// describe('test update and get', () => {
// 	it('test root', async () => {
// 		const ref = users.ref()
// 		const data = generateRandomData().data
// 		await update(ref, { a: '1' })
// 		await readAndExpect(data, ref, undefined)
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "a" node', async () => {
// 		const ref = users.ref('a')
// 		const data = generateRandomData().data
// 		await update(ref, data['a'])
// 		await readAndExpect(data, ref, 'a')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/c" node', async () => {
// 		const ref = users.ref('b/c')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['c'])
// 		await readAndExpect(data, ref, 'b/c')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/d" node', async () => {
// 		const ref = users.ref('b/d')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['d'])
// 		await readAndExpect(data, ref, 'b/d')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/d/f/j" node', async () => {
// 		const ref = users.ref('b/d/f/j')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['d']['f']['j'])
// 		await readAndExpect(data, ref, 'b/d/f/j')
// 		;() => {
// 			update(ref, data['a']) // no error because 'a' is numeric literal and 'j' is number
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/h/string" node', async () => {
// 		const rand = generateRandomData()
// 		const randString = rand.randString
// 		const data = rand.data
// 		const ref = users.ref(`b/h/${randString}`)
// 		await update(ref, data['b']['h'][randString]!)
// 		await readAndExpect(data, ref, `b/h/${randString}`)
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/h/string/i" node', async () => {
// 		const rand = generateRandomData()
// 		const randString = rand.randString
// 		const data = rand.data
// 		const ref = users.ref(`b/h/${randString}/i`)
// 		await update(ref, data['b']['h'][randString]!['i'])
// 		await readAndExpect(data, ref, `b/h/${randString}/i`)
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			update(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string' is boolean
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})

// 	it('test child "a" node', async () => {
// 		const ref = users.child(users.ref(), 'a')
// 		const data = generateRandomData().data
// 		await update(ref, data['a'])
// 		await readAndExpect(data, ref, 'a')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/c" node', async () => {
// 		const ref = users.child(users.ref('b'), 'c')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['c'])
// 		await readAndExpect(data, ref, 'b/c')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/d" node', async () => {
// 		const ref = users.child(users.ref('b'), 'd')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['d'])
// 		await readAndExpect(data, ref, 'b/d')
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/d/f/j" node', async () => {
// 		const ref = users.child(users.ref('b/d'), 'f/j')
// 		const data = generateRandomData().data
// 		await update(ref, data['b']['d']['f']['j'])
// 		await readAndExpect(data, ref, 'b/d/f/j')
// 		;() => {
// 			update(ref, data['a']) // no error because 'a' is numeric literal and 'j' is number
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/h/string" node', async () => {
// 		const rand = generateRandomData()
// 		const randString = rand.randString
// 		const data = rand.data
// 		const ref = users.child(users.ref(), `b/h/${randString}`)
// 		await update(ref, data['b']['h'][randString]!)
// 		await readAndExpect(data, ref, `b/h/${randString}`)
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			// @ts-expect-error
// 			update(ref, data['b']['c'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			update(ref, data['b']['h']['string']!)
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// 	it('test "b/h/string/i" node', async () => {
// 		const rand = generateRandomData()
// 		const randString = rand.randString
// 		const data = rand.data
// 		const ref = users.child(users.ref(`b`), `h/${randString}/i`)
// 		await update(ref, data['b']['h'][randString]!['i'])
// 		await readAndExpect(data, ref, `b/h/${randString}/i`)
// 		;() => {
// 			// @ts-expect-error
// 			update(ref, data['a'])
// 			update(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string' is boolean
// 			// @ts-expect-error
// 			update(ref, data['b']['d'])
// 			// @ts-expect-error
// 			update(ref, data['b']['d']['f']['j'])
// 			// @ts-expect-error
// 			update(ref, data['b']['h']['string']!)
// 			update(ref, data['b']['h']['string']!['i'])
// 		}
// 	})
// })
