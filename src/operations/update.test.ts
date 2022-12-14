import { update } from './update'
import { set } from './set'
import {
	readAndExpectForUpdateOp,
	generateRandomData,
	initializeApp,
	usersRefCreator,
	readAndExpectForSetOp,
} from '../utilForTests'

initializeApp()
const usersRef = usersRefCreator()

describe('test update and get', () => {
	it('test a node', async () => {
		const ref = usersRef()
		const data = generateRandomData().data
		const childPath = 'a'
		await update(ref, [childPath], [data['a']])
		await readAndExpectForUpdateOp(ref, childPath, data['a'])
		;() => {
			update(ref, [childPath], [data['a']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/c" node', async () => {
		const ref = usersRef('b')
		const data = generateRandomData().data
		const childPath = 'c'
		await update(ref, [childPath], [data['b']['c']])
		await readAndExpectForUpdateOp(ref, childPath, data['b']['c'])
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(ref, [childPath], [data['b']['c']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})
	it('test "b/d" node', async () => {
		const ref = usersRef()
		const data = generateRandomData().data
		const childPath = 'b/d'
		await update(ref, [childPath], [data['b']['d']])
		await readAndExpectForUpdateOp(ref, childPath, data['b']['d'])
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(ref, [childPath], [data['b']['d']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = usersRef('b/d')
		const data = generateRandomData().data
		const childPath = 'f/j'
		await update(ref, [childPath], [data['b']['d']['f']['j']])
		await readAndExpectForUpdateOp(ref, childPath, data['b']['d']['f']['j'])
		;() => {
			update(ref, [childPath], [data['a']]) // 'j' is number
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(ref, [childPath], [data['b']['d']['f']['j']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath],
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']] // 'j' is number
			)
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = randStringHKey
		const ref = usersRef(`b/h`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!])
		await readAndExpectForUpdateOp(
			ref,
			`${childPath}/`,
			data['b']['h'][randStringHKey]!
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(ref, [childPath], [data['b']['h']['string']!])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!,
				]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!['n'],
				]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'i'
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!['i']])
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['i']
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(ref, [childPath], [data['b']['c']]) // no error because 'c' is true and 'b/h/string' is boolean
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['i']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/m" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'm'
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!['m']])
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m']
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/m/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}` as const
		const ref = usersRef(`b/h/${randStringHKey}`)

		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['m'][randStringMKey]!]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']['string']!])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/m/string/n" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}/n` as const
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n']]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n']
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']['string']!['n']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/p" node, is push able only', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = `p`
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(
			ref,
			[
				// @ts-expect-error
				childPath,
			],
			[data['b']['h'][randStringHKey]!['p']]
		)
	})

	it('test "b/h/string/p/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const childPath = `p/${randStringPKey}` as const
		const ref = usersRef(`b/h/${randStringHKey}`)

		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['p'][randStringPKey]!]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['p'][randStringPKey]!
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['p']['string']!])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/p/string/r" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const childPath = `p/${randStringPKey}/r` as const
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['p'][randStringPKey]!['r']]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['p'][randStringPKey]!['r']
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!['n'],
				]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['p']['string']!['r']])
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/s" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 's'
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[
				data['b']['h'][randStringHKey]!['s'] as
					| {
							[x: `${number}`]: {
								t: number
							}
					  }
					| {
							t: number
					  }[],
			]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['s']
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath],
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/s/numeric" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = `s/0` as const
		const ref = usersRef(`b/h/${randStringHKey}`)

		await update(
			ref,
			[childPath],
			[(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!
		)
		;() => {
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath],
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test "b/h/string/s/numeric/t" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = `s/0/t` as const
		const ref = usersRef(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!['t']]
		)
		await readAndExpectForUpdateOp(
			ref,
			childPath,
			(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!['t']
		)
		;() => {
			update(ref, [childPath], [data['a']]) // b/h/string/s/numeric/t is number
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['d']]
			)
			update(ref, [childPath], [data['b']['d']['f']['j']]) // b/h/string/s/numeric/t is number
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!['n'],
				]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[data['b']['h']['string']!['s'] as { t: number }[]]
			)
			update(
				ref,
				[childPath], // @ts-expect-error
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!]
			)
			update(
				ref,
				[childPath],
				[(data['b']['h']['string']!['s'] as { t: number }[])[0]!['t']]
			)
		}
	})

	it('test update multiple data type', async () => {
		const ref = usersRef()
		const oriRand = generateRandomData()
		const oriData = oriRand.data
		const oriRandStringHKey = oriRand.randStringHKey
		const oriRandStringMKey = oriRand.randStringMKey
		await set(ref, oriData)
		const rand = generateRandomData()
		const data = rand.data
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		await update(
			ref,
			[
				'a',
				'b/d/k',
				'b/d/f/j',
				`b/h/${oriRandStringHKey}/m/${oriRandStringMKey}`,
				`b/h/${oriRandStringHKey}/s/0`,
			],
			[
				data['a'],
				data['b']['d']['k'],
				data['b']['d']['f']['j'],
				data['b']['h'][randStringHKey]!['m'][randStringMKey]!,
				(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!,
			]
		)
		oriData['a'] = data['a']

		oriData['b']['d']['k'] = data['b']['d']['k']

		oriData['b']['d']['f']['j'] = data['b']['d']['f']['j']

		oriData['b']['h'][oriRandStringHKey]!['m'][oriRandStringMKey]! =
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!
		//
		;(oriData['b']['h'][oriRandStringHKey]!['s'] as { t: number }[])[0]! = (
			data['b']['h'][randStringHKey]!['s'] as { t: number }[]
		)[0]!

		await readAndExpectForSetOp(ref, undefined, oriData)
	})

	it('test "q" node is push able only', async () => {
		const childPath = `q`
		const ref = usersRef()
		;() =>
			update(
				ref,
				[
					// @ts-expect-error
					childPath,
				],
				[]
			)
	})

	it('test descendant path type exist or not', () => {
		const ref = usersRef()
		const abc = 'abc' as string
		const _123 = 123 as number
		;() =>
			update(
				ref,
				[
					'a',
					'b',
					// @ts-expect-error
					'b/h/abc',
					// @ts-expect-error
					'b/h/abc/m/xyz',
					// @ts-expect-error
					`b/h/abc/m/${abc}`,
					// @ts-expect-error
					`b/h/abc/s/123`,
					// @ts-expect-error
					`b/h/abc/s/${_123}`,
					// @ts-expect-error
					'b/h/efg/m/xyz',
					// @ts-expect-error
					`b/h/efg/m/${abc}`,
					// @ts-expect-error
					`b/h/efg/s/123`,
					// @ts-expect-error
					`b/h/efg/s/${_123}`,
				],
				[]
			)
	})

	it('test path type', async () => {
		const ref = usersRef()
		const abc = 'abc' as string
		const _123 = 123 as number
		;() =>
			update(
				ref,
				[
					'a',
					// @ts-expect-error
					'c',
					// @ts-expect-error
					'b/h/123',
					// @ts-expect-error
					`b/h/${_123}`,
					'b/h/abc/m/xyz',
					`b/h/abc/m/${abc}`,
					// @ts-expect-error
					`b/h/abc/m/123`,
					// @ts-expect-error
					`b/h/abc/m/${_123}`,
					// @ts-expect-error
					'b/h/abc/s/xyz',
					// @ts-expect-error
					`b/h/abc/s/${abc}`,
					`b/h/abc/s/123`,
					`b/h/abc/s/${_123}`,
				],
				[]
			)
	})

	it('test arr = string[] trigger error', async () => {
		const ref = usersRef()
		const abc = 'abc' as string
		const _123 = 123 as number
		const arr = [
			'a',
			'b',
			'b/h',
			'b/h/abc',
			`b/h/${abc}`,
			'b/h/abc/m/xyz',
			`b/h/abc/m/${abc}`,
			`b/h/abc/s/123`,
			`b/h/abc/s/${_123}`,
		]
		;() => {
			update(
				ref, // @ts-expect-error
				arr,
				[]
			)
		}
	})

	it('test not enough data type', async () => {
		const ref = usersRef()
		const abc = 'abc' as string
		const _123 = 123 as number
		const arr = [
			'a',
			'b/h/abc/m/xyz',
			`b/h/abc/m/${abc}`,
			`b/h/abc/s/123`,
			`b/h/abc/s/${_123}`,
		] as const
		;() => {
			update(
				ref,
				arr, // @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				arr,
				// @ts-expect-error
				[]
			)
		}
	})
})
