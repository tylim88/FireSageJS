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
		await update(ref, { a: data['a'] })
		await readAndExpectUpdate(ref, 'a', data['a'])
		;() => {
			update(ref, { a: data['a'] })
			// @ts-expect-error
			update(ref, { a: data['b']['c'] })
			// @ts-expect-error
			update(ref, { a: data['b']['d'] })
			// @ts-expect-error
			update(ref, { a: data['b']['d']['f']['j'] })
			// @ts-expect-error
			update(ref, { a: data['b']['h']['string']! })
			// @ts-expect-error
			update(ref, { a: data['b']['h']['string']!['i'] })
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
		await update(ref, { c: data['b']['c'] })
		await readAndExpectUpdate(ref, 'c', data['b']['c'])
		;() => {
			// @ts-expect-error
			update(ref, { c: data['a'] })
			update(ref, { c: data['b']['c'] })
			// @ts-expect-error
			update(ref, { c: data['b']['d'] })
			// @ts-expect-error
			update(ref, { c: data['b']['d']['f']['j'] })
			// @ts-expect-error
			update(ref, { c: data['b']['h']['string']! })
			// @ts-expect-error
			update(ref, { c: data['b']['h']['string']!['i'] })
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		await update(ref, { 'b/d': data['b']['d'] })
		await readAndExpectUpdate(ref, 'b/d', data['b']['d'])
		;() => {
			// @ts-expect-error
			update(ref, { 'b/d': data['a'] })
			// @ts-expect-error
			update(ref, { 'b/d': data['b']['c'] })
			update(ref, { 'b/d': data['b']['d'] })
			// @ts-expect-error
			update(ref, { 'b/d': data['b']['d']['f']['j'] })
			// @ts-expect-error
			update(ref, { 'b/d': data['b']['h']['string']! })
			// @ts-expect-error
			update(ref, { 'b/d': data['b']['h']['string']!['i'] })
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.ref('b/d')
		const data = generateRandomData().data
		await update(ref, { 'f/j': data['b']['d']['f']['j'] })
		await readAndExpectUpdate(ref, 'f/j', data['b']['d']['f']['j'])
		;() => {
			update(ref, { 'f/j': data['a'] }) // because 'a' is also a number
			// @ts-expect-error
			update(ref, { 'f/j': data['b']['c'] })
			// @ts-expect-error
			update(ref, { 'f/j': data['b']['d'] })
			update(ref, { 'f/j': data['b']['d']['f']['j'] })
			// @ts-expect-error
			update(ref, { 'f/j': data['b']['h']['string']! })
			// @ts-expect-error
			update(ref, { 'f/j': data['b']['h']['string']!['i'] })
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h`)
		await update(ref, { [randStringHKey]: data['b']['h'][randStringHKey]! })
		await readAndExpectUpdate(
			ref,
			`${randStringHKey}/`,
			data['b']['h'][randStringHKey]!
		)
		;() => {
			// @ts-expect-error
			update(ref, { [randStringHKey]: data['a'] })
			// @ts-expect-error
			update(ref, { [randStringHKey]: data['b']['c'] })
			// @ts-expect-error
			update(ref, { [randStringHKey]: data['b']['d'] })
			// @ts-expect-error
			update(ref, { [randStringHKey]: data['b']['d']['f']['j'] })
			update(ref, { [randStringHKey]: data['b']['h']['string']! })
			// @ts-expect-error
			update(ref, { [randStringHKey]: data['b']['h']['string']!['i'] })
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(ref, { i: data['b']['h'][randStringHKey]!['i'] })
		await readAndExpectUpdate(ref, `i`, data['b']['h'][randStringHKey]!['i'])
		;() => {
			// @ts-expect-error
			update(ref, { i: data['a'] })
			update(ref, { i: data['b']['c'] }) // no error because 'c' is true and 'b/h/string' is boolean
			// @ts-expect-error
			update(ref, { i: data['b']['d'] })
			// @ts-expect-error
			update(ref, { i: data['b']['d']['f']['j'] })
			// @ts-expect-error
			update(ref, { i: data['b']['h']['string']! })
			update(ref, { i: data['b']['h']['string']!['i'] })
		}
	})
})
