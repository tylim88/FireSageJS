import { onValue } from './onValue'
import { isOptions } from '../utils'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	readAndExpectSet,
} from '../utilForTests'
import { set } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'

initializeApp()
const users = usersCreator()

describe('test onValue', () => {
	it('test isOption', () => {
		expect(isOptions({})).toBe(false)
		expect(isOptions({ onlyOnce: false })).toBe(true)
		expect(isOptions({ onlyOnce: true })).toBe(true)
	})
	it('test with options', done => {
		const ref = users.ref()
		const data = generateRandomData().data
		expect.hasAssertions()
		set(ref, data).then(() => {
			const unsub = onValue(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					type B = DataSnapshot<Users, undefined>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, undefined, data)
					unsub()
					done()
				},
				{ onlyOnce: false }
			)
		})
	})
	it('test with cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h/${randStringHKey}`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randStringHKey]!).then(() => {
			const unsub = onValue(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					type B = DataSnapshot<Users, `b/h/${string}`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randStringHKey}`, data)
					unsub()
					done()
				},
				() => {
					//
				}
			)
		})
	})
	it('test with options and cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h/${randStringHKey}/i`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randStringHKey]!['i']).then(() => {
			const unsub = onValue(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					type B = DataSnapshot<Users, `b/h/${string}/i`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randStringHKey}/i`, data)
					unsub()
					done()
				},
				() => {
					//
				},
				{ onlyOnce: true }
			)
		})
	})
	it('test with push-able and remove-able', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h/${randStringHKey}/m`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
			const unsub = onValue(ref, async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m`>
				IsTrue<IsSame<B, A>>()
				await readAndExpectSet(ref, `b/h/${randStringHKey}/m`, data)
				unsub()
				done()
			})
		})
	})
})
