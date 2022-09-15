import { onChildAdded } from './onChildAdded'
import {
	generateRandomData,
	initializeApp,
	usersRefCreator,
	Users,
	compareListeners,
} from '../utilForTests'
import { set, push } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const usersRef = usersRefCreator()

describe('test onChildAdded', () => {
	it('test with nothing', done => {
		const rand = generateRandomData()
		const randStringOKey = rand.randStringOKey
		const data = rand.data
		const path = `o` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildAdded(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `o/${string}`>
				IsTrue<IsSame<B, A>>()
				compareListeners(`${path}/${randStringOKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['o']).then(() => {
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
		const ref = usersRef(path)
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
		const ref = usersRef(path)
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
	it('test with incorrect path', () => {
		;() => {
			onChildAdded(
				// @ts-expect-error
				usersRef('a'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				usersRef('b/c'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				usersRef('b/d'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				usersRef('b/d/e'),
				() => {
					//
				}
			)

			onChildAdded(
				// @ts-expect-error
				usersRef('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
