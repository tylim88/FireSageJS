import { onChildAdded } from './onChildAdded'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareOnValue,
} from '../utilForTests'
import { set, push } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'

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
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
			const unsub = onChildAdded(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
					IsTrue<IsSame<B, A>>()
					compareOnValue(`${path}/${randStringMKey}`, dataSnapshot, data)
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
		const randStringPKey = rand.randStringPKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/p` as const
		const ref = users.ref(path)
		expect.hasAssertions()
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			() => {
				const unsub = onChildAdded(
					ref,
					async dataSnapshot => {
						type A = typeof dataSnapshot
						type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
						IsTrue<IsSame<B, A>>()
						compareOnValue(`${path}/${randStringPKey}`, dataSnapshot, data)
						unsub()
						done()
					},
					() => {
						//
					}
				)
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
		set(ref, data['b']['h'][randStringHKey]!['s']).then(() => {
			const unsub = onChildAdded(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
					IsTrue<IsSame<B, A>>()
					compareOnValue(`${path}/0`, dataSnapshot, data)
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
