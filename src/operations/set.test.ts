import { set } from './set'
import {
	readAndExpectForSetOp,
	generateRandomData,
	initializeApp,
	usersRefCreator,
} from '../utilForTests'

initializeApp()
const usersRef = usersRefCreator()

describe('test set and get', () => {
	it('test root', async () => {
		const ref = usersRef()
		const data = generateRandomData().data
		await set(ref, data)
		await readAndExpectForSetOp(ref, undefined, data)
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
	it('test "a" node', async () => {
		const ref = usersRef('a')
		const data = generateRandomData().data
		await set(ref, data['a'])
		await readAndExpectForSetOp(ref, 'a', data)
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
		const ref = usersRef('b/c')
		const data = generateRandomData().data
		await set(ref, data['b']['c'])
		await readAndExpectForSetOp(ref, 'b/c', data)
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
		const ref = usersRef('b/d')
		const data = generateRandomData().data
		await set(ref, data['b']['d'])
		await readAndExpectForSetOp(ref, 'b/d', data)
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
		const ref = usersRef('b/d/f/j')
		const data = generateRandomData().data
		await set(ref, data['b']['d']['f']['j'])
		await readAndExpectForSetOp(ref, 'b/d/f/j', data)
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
		const ref = usersRef(`b/h/${randStringHKey}`)
		await set(ref, data['b']['h'][randStringHKey]!)
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}`, data)
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
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = usersRef(`b/h/${randStringHKey}/i`)
		await set(ref, data['b']['h'][randStringHKey]!['i'])
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}/i`, data)
		;() => {
			set(
				ref, // @ts-expect-error
				data['a']
			)
			set(ref, data['b']['c']) // no error because 'c' is true and 'b/h/string/i' is boolean
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
			set(ref, data['b']['h']['string']!['i'])
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
		const ref = usersRef(`b/h/${randStringHKey}/m`)
		await set(ref, data['b']['h'][randStringHKey]!['m'])
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}/m`, data)
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
		const ref = usersRef(`b/h/${randStringHKey}/m/${randStringMKey}`)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!)
		await readAndExpectForSetOp(
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
		const ref = usersRef(`b/h/${randStringHKey}/m/${randStringMKey}/n`)
		await set(ref, data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n'])
		await readAndExpectForSetOp(
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

	it('test "b/h/string/p" node, push able only node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = usersRef(`b/h/${randStringHKey}/p`)
		;() =>
			set(
				// @ts-expect-error
				ref,
				data['b']['h'][randStringHKey]!['p']
			)
	})

	it('test "b/h/string/p/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const ref = usersRef(`b/h/${randStringHKey}/p/${randStringPKey}`)
		await set(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!)
		await readAndExpectForSetOp(
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
		const ref = usersRef(`b/h/${randStringHKey}/p/${randStringPKey}/r`)
		await set(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!['r'])
		await readAndExpectForSetOp(
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
		const ref = usersRef(`b/h/${randStringHKey}/s`)
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
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}/s`, data)
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
			set(ref, data['b']['h']['string']!['s'] as { t: number }[])
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
		const ref = usersRef(`b/h/${randStringHKey}/s/0`)
		await set(
			ref,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!
		)
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}/s/0`, data)
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
		const ref = usersRef(`b/h/${randStringHKey}/s/0/t`)
		await set(
			ref,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!['t']
		)
		await readAndExpectForSetOp(ref, `b/h/${randStringHKey}/s/0/t`, data)
		;() => {
			set(ref, data['a']) // t is number
			set(
				ref, // @ts-expect-error
				data['b']['c']
			)
			set(
				ref, // @ts-expect-error
				data['b']['d']
			)
			set(ref, data['b']['d']['f']['j']) // t is number
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
