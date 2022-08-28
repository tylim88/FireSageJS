import { onChildAdded } from './onChildAdded'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareListeners,
} from '../utilForTests'
import { set, push } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const users = usersCreator()

describe('test onChildAdded', () => {
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		const unsub = onChildAdded(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringMKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
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

		const unsub = onChildAdded(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringPKey}`, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			() => {
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
		const unsub = onChildAdded(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['s']).then(() => {
			unsub()
			done()
		})
	})
	it('test with negative path', () => {
		;() => {
			onChildAdded(
				// @ts-expect-error
				users.ref('a'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				users.ref('b/c'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				users.ref('b/d'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				users.ref('b/d/e'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				users.ref('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
