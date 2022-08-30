import { get } from './get'
import { initializeApp, usersRef, dataForQuery, Users } from '../utilForTests'
import { query } from '../refs'
import {
	startAfter,
	startAt,
	endAt,
	endBefore,
	equalTo,
	limitToFirst,
	limitToLast,
	orderByChild,
	orderByKey,
	orderByValue,
} from '../queryConstraints'
import { set } from '../operations'
import { IsTrue, IsSame, DataSnapshot } from '../types'

initializeApp()

describe('test get and query', () => {
	beforeEach(() => {
		return set(usersRef(), dataForQuery())
	})

	it('test orderByValue, startAt and limitToFirst', async () => {
		const snapshot = await get(
			query(usersRef('o'), orderByValue(), startAt(3), limitToFirst(2))
		)
		const val = snapshot.val()
		expect(val).toEqual({ w: 4, x: 3 })
		IsTrue<IsSame<typeof val, Users['read']['o'] | null>>()
	})

	it('test orderByValue, endAt with key and limitToLast', async () => {
		const snapshot = await get(
			query(usersRef('u'), orderByValue(), endAt('e', '3'), limitToLast(5))
		)
		const val = snapshot.val()
		expect(val).toEqual({ 0: 'a', 1: 'b', 2: 'c', 3: 'd' })
	})

	it('test orderByValue, startAfter', async () => {
		const snapshot = await get(
			query(usersRef('q'), orderByValue(), startAfter(0))
		)
		const val = snapshot.val()
		expect(val).toEqual({ d: 5, p: 1, y: 4, b: 6 })
	})
})
