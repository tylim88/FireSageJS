import { onChildChanged } from './onChildChanged'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	compareListeners,
} from '../utilForTests'
import { set, push, update } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'
import { query } from '../refs'

initializeApp()
const users = usersCreator()

describe('test onChildChanged', () => {
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const path = `b/h/${randStringHKey}/m` as const
		const ref = users.ref(path)
		const newData =
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n'] === '7'
				? '8'
				: '7'
		expect.hasAssertions()
		const unsub = onChildChanged(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/m/${string}`>
				IsTrue<IsSame<B, A>>()
				data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n'] = newData
				compareListeners(`${path}/${randStringMKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['b']['h'][randStringHKey]!['m']).then(async () => {
			await update(ref, [randStringMKey], [{ n: newData }])
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
		const newData = 'something'
		expect.hasAssertions()
		const unsub = onChildChanged(
			query(ref),
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/p/${string}`>
				IsTrue<IsSame<B, A>>()
				// @ts-expect-error
				data['b']['h'][randStringHKey]!['p'][randStringPKey]!['r'] = newData
				compareListeners(`${path}/${randStringPKey}`, dataSnapshot, data)
				unsub()
				done()
			},
			() => {
				//
			}
		)
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			async thenRef => {
				await update(
					ref,
					[thenRef.key],
					[
						{
							// @ts-expect-error
							r: newData,
						},
					]
				)
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
		const newData = Math.random()
		expect.hasAssertions()
		const unsub = onChildChanged(
			ref,
			async dataSnapshot => {
				type A = typeof dataSnapshot
				type B = DataSnapshot<Users, `b/h/${string}/s/${number}`>
				IsTrue<IsSame<B, A>>()
				;(data['b']['h'][randStringHKey]!['s'] as { t: number }[]) = [
					{
						t: newData,
					},
				]
				compareListeners(`${path}/0`, dataSnapshot, data)
			},
			() => {
				//
			},
			{ onlyOnce: true }
		)
		set(ref, data['b']['h'][randStringHKey]!['s']).then(async () => {
			await update(ref, ['0'], [{ t: newData }])
			unsub()
			done()
		})
	})
	it('test with negative path', () => {
		;() => {
			onChildChanged(
				// @ts-expect-error
				users.ref('a'),
				() => {
					//
				}
			)

			onChildChanged(
				// @ts-expect-error
				users.ref('b/c'),
				() => {
					//
				}
			)

			onChildChanged(
				// @ts-expect-error
				users.ref('b/d'),
				() => {
					//
				}
			)

			onChildChanged(
				// @ts-expect-error
				users.ref('b/d/e'),
				() => {
					//
				}
			)

			onChildChanged(
				// @ts-expect-error
				users.ref('b/d/k'),
				() => {
					//
				}
			)
		}
	})
})
