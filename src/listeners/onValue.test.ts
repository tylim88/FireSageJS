import { onValue } from './onValue'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareListeners,
} from '../utilForTests'
import { set } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const users = usersCreator()

describe('test onValue', () => {
	it('test with options', done => {
		const rand = generateRandomData()
		const data = rand.data
		const ref = users.ref()
		expect.hasAssertions()
		const unsub = onValue(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, undefined>
				IsTrue<IsSame<B, A>>()
				compareListeners(undefined, dataSnapshot, data)
			},
			{ onlyOnce: true }
		)
		set(ref, data).then(() => {
			unsub()
			done()
		})
	})
	it('test with cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const path = `b/h/${randStringHKey}` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onValue(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(path, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		set(ref, data['b']['h'][randStringHKey]!).then(() => {
			unsub()
			done()
		})
	})
	it('test with options and cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/i` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onValue(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/i`>
				IsTrue<IsSame<B, A>>()
				compareListeners(path, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['i']).then(() => {
			unsub()
			done()
		})
	})
	it('test with push-able and remove-able data type', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onValue(query(ref), async dataSnapshot => {
			type A = typeof dataSnapshot
			type B = DataSnapshot<Users, `b/h/${string}/m`>
			IsTrue<IsSame<B, A>>()
			compareListeners(path, dataSnapshot, data)
		})
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
			unsub()
			done()
		})
	})
})
// it('test with options', done => {
// 	const rand = generateRandomData()
// 	const data = rand.data
// 	const ref = users.ref()
// 	expect.hasAssertions()
// 	const unsub = onValue(
// 		ref,
// 		async dataSnapshot => {
// 			type A = typeof dataSnapshot
// 			type B = DataSnapshot<Users, undefined>
// 			IsTrue<IsSame<B, A>>()
// 			await compareSnapshotAndValueWithPath(ref, undefined, data)
// 		}
// { onlyOnce: true }
// 	)
// 	// weird async operation sequence
// 	// does not write into database if written like this, probably because jest worker ended
// 	// not a correct way to test but will keep this as reference for future
// 	set(ref, data) // ! see explanation below
// 	unsub()
// 	done()
// 	// if we haven't listened to root node
// 	// the listener callback will not run immediately after we setup the listener
// 	// if we haven listened to root node
// 	// the listener callback will run immediately after we setup the listener
// })
