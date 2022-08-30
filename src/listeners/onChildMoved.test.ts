import { onChildMoved } from './onChildMoved'
import {
	generateRandomData,
	initializeApp,
	usersRef,
	Users,
	compareListeners,
} from '../utilForTests'
import { set, push } from '../operations'
import { setPriority } from '../operations/setPriority'
import { setWithPriority } from '../operations/setWithPriority'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()

describe('test onChildMoved', () => {
	it('test with nothing', done => {
		const rand = generateRandomData()
		const data = rand.data
		const path = `w` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `w/${number}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`w/0`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['w']).then(async () => {
			await setPriority(usersRef(`${path}/0`), 1000)
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
		const unsub = onChildMoved(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringMKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(async () => {
			await setPriority(usersRef(`${path}/${randStringMKey}`), 1000)
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
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildMoved(
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
			async thenRef => {
				await setPriority(usersRef(`${path}/${thenRef.key}`), 1000)
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
		const unsub = onChildMoved(
			query(ref),
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
		set(ref, data['b']['h'][randStringHKey]!['s']).then(async () => {
			await setWithPriority(
				usersRef(`${path}/0`),
				(data['b']['h'][randStringHKey]!['s'] as { t: number }[])[0]!,
				1000
			)
			unsub()
			done()
		})
	})
	it('test with incorrect path', () => {
		;() => {
			onChildMoved(
				// @ts-expect-error
				usersRef('a'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				usersRef('b/c'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				usersRef('b/d'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				usersRef('b/d/e'),
				() => {
					//
				}
			)

			onChildMoved(
				// @ts-expect-error
				usersRef('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
