import { onChildMoved } from './onChildMoved'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareOnValue,
} from '../utilForTests'
import { set, push, setPriority } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'

initializeApp()
const users = usersCreator()

describe('test onChildMoved', () => {
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				compareOnValue(`${path}/${randStringMKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(async () => {
			await setPriority(users.ref(`${path}/${randStringMKey}`), 1000)
			unsub()
			done()
		})
	})
	it('test with cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/p` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
				IsTrue<IsSame<B, A>>()
				compareOnValue(`${path}/${randStringPKey}`, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			async thenRef => {
				await setPriority(users.ref(`${path}/${thenRef.key}`), 1000)
				unsub()
				done()
			}
		)
	})
	it('test with options and cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/s` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
				IsTrue<IsSame<B, A>>()
				compareOnValue(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['s']).then(async () => {
			await setPriority(users.ref(`${path}/0`), 1000)
			unsub()
			done()
		})
	})
	it('test with negative path', () => {
		;() => {
			onChildMoved(
				// @ts-expect-error
				users.ref('a'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/c'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d/e'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				users.ref('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
