import { onValue, isOptions } from './onValue'
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
		const randString = rand.randString
		const data = rand.data
		const ref = users.ref(`b/h/${randString}`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randString]!).then(() => {
			const unsub = onValue(
				ref,
				async documentSnapshot => {
					type A = typeof documentSnapshot
					type B = DataSnapshot<Users, `b/h/${string}`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randString}`, data)
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
		const randString = rand.randString
		const data = rand.data
		const ref = users.ref(`b/h/${randString}/i`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randString]!['i']).then(() => {
			const unsub = onValue(
				ref,
				async documentSnapshot => {
					type A = typeof documentSnapshot
					type B = DataSnapshot<Users, `b/h/${string}/i`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randString}/i`, data)
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
	it('test with nothing', done => {
		const rand = generateRandomData()
		const data = rand.data
		const ref = users.ref(`b/c`)
		expect.hasAssertions()
		set(ref, data['b']['c']!).then(() => {
			const unsub = onValue(ref, async documentSnapshot => {
				type A = typeof documentSnapshot
				type B = DataSnapshot<Users, `b/c`>
				IsTrue<IsSame<B, A>>()
				await readAndExpectSet(ref, `b/c`, data)
				unsub()
				done()
			})
		})
	})
})
