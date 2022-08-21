import { onChildAdded } from './onChildAdded'
import {
	generateRandomData,
	initializeApp,
	usersCreator,
	Users,
	readAndExpectSet,
} from '../utilForTests'
import { set, push } from '../operations'
import { IsSame, IsTrue, DataSnapshot } from '../types'

initializeApp()
const users = usersCreator()

describe('test onChildAdded', () => {
	it('test with options', done => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const ref = users.ref(`b/h/${randStringHKey}/m`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randStringHKey]!['m']).then(() => {
			const unsub = onChildAdded(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					console.log(dataSnapshot.val())
					type B = DataSnapshot<Users, `b/h/${string}/m`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randStringHKey}/m`, data)
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
		const ref = users.ref(`b/h/${randStringHKey}/p`)
		expect.hasAssertions()
		push(ref, data['b']['h'][randStringHKey]!['p'][randStringPKey]!).then(
			() => {
				const unsub = onChildAdded(
					ref,
					async dataSnapshot => {
						type A = typeof dataSnapshot
						console.log(dataSnapshot.val())
						type B = DataSnapshot<Users, `b/h/${string}/p`>
						IsTrue<IsSame<B, A>>()
						await readAndExpectSet(ref, `b/h/${randStringHKey}/p`, data)
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
		const ref = users.ref(`b/h/${randStringHKey}/s`)
		expect.hasAssertions()
		set(ref, data['b']['h'][randStringHKey]!['s']).then(() => {
			const unsub = onChildAdded(
				ref,
				async dataSnapshot => {
					type A = typeof dataSnapshot
					console.log(dataSnapshot.val())
					type B = DataSnapshot<Users, `b/h/${string}/s`>
					IsTrue<IsSame<B, A>>()
					await readAndExpectSet(ref, `b/h/${randStringHKey}/s`, data)
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
})
