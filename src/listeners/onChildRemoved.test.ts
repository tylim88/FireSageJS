import { onChildRemoved } from './onChildRemoved'
import {
	generateRandomData,
	initializeApp,
	usersRefCreator,
	Users,
	assertDataFromListeners,
} from '../utilForTests'
import { set, push, remove } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const usersRef = usersRefCreator()

describe('test onChildRemoved', () => {
	it('test with nothing', done => {
		const rand = generateRandomData()
		const data = rand.data
		const path = `u` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildRemoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `u/${number}`>
				IsTrue<IsSame<B, A>>()
				assertDataFromListeners(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		set(ref, data['u']).then(async () => {
			await remove(usersRef(`${path}/0`))
			unsub()
			done()
		})
	})
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = usersRef(path)

		expect.hasAssertions()
		const unsub = onChildRemoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				assertDataFromListeners(`${path}/${randStringMKey}`, dataSnapshot, data)
				unsub()
				done()
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
			remove(usersRef(`${path}/${randStringMKey}`))
		})
	})
	it('test with cancel callback', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/p` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildRemoved(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
				IsTrue<IsSame<B, A>>()
				assertDataFromListeners(`${path}/${randStringPKey}`, dataSnapshot, data)
			},
			() => {
				//
			}
		)
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			async thenRef => {
				await remove(usersRef(`${path}/${thenRef.key}`))
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
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildRemoved(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
				IsTrue<IsSame<B, A>>()
				assertDataFromListeners(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['s']).then(async () => {
			await remove(usersRef(`${path}/0`))
			unsub()
			done()
		})
	})
	it('test with incorrect path', () => {
		;() => {
			onChildRemoved(
				// @ts-expect-error
				usersRef('a'),
				() => {
					//
				}
			)

			onChildRemoved(
				// @ts-expect-error
				usersRef('b/c'),
				() => {
					//
				}
			)

			onChildRemoved(
				// @ts-expect-error
				usersRef('b/d'),
				() => {
					//
				}
			)

			onChildRemoved(
				// @ts-expect-error
				usersRef('b/d/e'),
				() => {
					//
				}
			)

			onChildRemoved(
				// @ts-expect-error
				usersRef('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
