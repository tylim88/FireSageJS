import { update } from './update'
import {
	readAndExpectUpdate,
	generateRandomData,
	initializeApp,
	usersCreator,
} from '../utilForTests'

initializeApp()

const users = usersCreator()

describe('test update and get', () => {
	it('test root', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		const childPath = 'a'
		await update(ref, [childPath, data['a']])
		await readAndExpectUpdate(ref, childPath, data['a'])
		;() => {
			update(ref, [childPath, data['a']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "a" node', async () => {
		const ref = users.ref('a')
		const data = generateRandomData().data
		;() =>
			update(
				ref,
				// @ts-expect-error
				{ 'b/c': data['b']['c'] }
			)
	})
	it('test "b/c" node', async () => {
		const ref = users.ref('b')
		const data = generateRandomData().data
		const childPath = 'c'
		await update(ref, [childPath, data['b']['c']])
		await readAndExpectUpdate(ref, childPath, data['b']['c'])
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(ref, [childPath, data['b']['c']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		const childPath = 'b/d'
		await update(ref, [childPath, data['b']['d']])
		await readAndExpectUpdate(ref, childPath, data['b']['d'])
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(ref, [childPath, data['b']['d']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.ref('b/d')
		const data = generateRandomData().data
		const childPath = 'f/j'
		await update(ref, [childPath, data['b']['d']['f']['j']])
		await readAndExpectUpdate(ref, childPath, data['b']['d']['f']['j'])
		;() => {
			update(ref, [childPath, data['a']]) // no error, because 'a' is also a number
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(ref, [childPath, data['b']['d']['f']['j']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = randStringHKey
		const ref = users.ref(`b/h`)
		await update(ref, [childPath, data['b']['h'][randStringHKey]!])
		await readAndExpectUpdate(
			ref,
			`${childPath}/`,
			data['b']['h'][randStringHKey]!
		)
		;() => {
			// @ts-expect-error
			update(ref, [childPath, data['a']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['c']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['d']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['d']['f']['j']])
			update(ref, [childPath, data['b']['h']['string']!])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['i']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['m']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['m']['string']!])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['m']['string']!['n']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['p']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['p']['string']!])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['p']['string']!['r']])
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'i'
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(ref, [childPath, data['b']['h'][randStringHKey]!['i']])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['i']
		)
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(ref, [childPath, data['b']['c']]) // no error because 'c' is true and 'b/h/string' is boolean
			// @ts-expect-error
			update(ref, [childPath, data['b']['d']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['d']['f']['j']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!])
			update(ref, [childPath, data['b']['h']['string']!['i']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['m']])
			// @ts-expect-error
			update(ref, [childPath, data['b']['h']['string']!['m']['string']!])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'm'
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(ref, [childPath, data['b']['h'][randStringHKey]!['m']])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m']
		)
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(ref, [childPath, data['b']['h']['string']!['m']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}` as const
		const ref = users.ref(`b/h/${randStringHKey}`)

		await update(ref, [
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!,
		])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!
		)
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(ref, [childPath, data['b']['h']['string']!['m']['string']!])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m/string/n" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}/n` as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		type i = `a/${string}/n/` extends `a/${string}/` ? 1 : 2
		//   ^?
		await update(ref, [
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!,
		])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n']
		)
		;() => {
			update(
				ref,
				// @ts-expect-error
				[childPath, data['a']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['c']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['d']['f']['j']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['i']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['m']['string']!]
			)
			update(ref, [childPath, data['b']['h']['string']!['m']['string']!['n']])
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				// @ts-expect-error
				[childPath, data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
})
