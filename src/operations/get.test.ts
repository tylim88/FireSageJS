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
import { IsTrue, IsSame } from '../types'

initializeApp()

describe('test get and query', () => {
	beforeAll(() => {
		return set(usersRef(), dataForQuery())
	})

	it('test orderByValue, startAt and limitToFirst', async () => {
		const snapshot = await get(
			query(usersRef('o'), orderByValue(), startAt(3), limitToFirst(2))
		)
		const val = snapshot.val()
		expect(val).toEqual({ w: 4, x: 3 })
		IsTrue<IsSame<typeof val, Users['read']['o'] | null>>()

		const key = snapshot.key
		expect(key).toBe('o')
		IsTrue<IsSame<typeof key, 'o'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('w')).toBe(true)
		expect(snapshot.hasChild('v')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = Object.values(val || {}).sort()
		snapshot.forEach((child, i) => {
			expect(child.val()).toBe(arr[i])
		})

		const childVal = snapshot.child('x').val()
		expect(childVal).toBe(3)
		IsTrue<IsSame<typeof childVal, Users['read']['o']['x'] | null>>()
	})

	it('test orderByValue, endAt with key and limitToLast', async () => {
		const snapshot = await get(
			query(usersRef('u'), orderByValue(), endAt('e', '3'), limitToLast(5))
		)
		const val = snapshot.val()
		expect(val).toEqual({ 0: 'a', 1: 'b', 2: 'c', 3: 'd' })
		IsTrue<IsSame<typeof val, Users['read']['u'] | null>>()

		const key = snapshot.key
		expect(key).toBe('u')
		IsTrue<IsSame<typeof key, 'u'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('0')).toBe(true)
		expect(snapshot.hasChild('5')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = Object.values(val || {}).sort()
		snapshot.forEach((child, i) => {
			expect(child.val()).toBe(arr[i])
		})

		const childVal = snapshot.child('2').val()
		expect(childVal).toBe('c')
		IsTrue<IsSame<typeof childVal, Users['read']['u']['2'] | null>>()
	})

	it('test orderByKey, startAfter', async () => {
		const snapshot = await get(
			query(usersRef('q'), orderByKey(), startAfter('d'))
		)
		const val = snapshot.val()
		expect(val).toEqual({ p: 1, y: 4, m: 0 })

		const key = snapshot.key
		expect(key).toBe('q')
		IsTrue<IsSame<typeof key, 'q'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('p')).toBe(true)
		expect(snapshot.hasChild('b')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [0, 1, 4]
		snapshot.forEach((child, i) => {
			expect(child.val()).toBe(arr[i])
		})

		const childVal = snapshot.child('y').val()
		expect(childVal).toBe(4)
		IsTrue<IsSame<typeof childVal, Users['read']['q']['y'] | null>>()
	})

	it('test orderByKey, startAfter', async () => {
		const snapshot = await get(
			query(usersRef('q'), orderByKey(), startAfter('d'))
		)
		const val = snapshot.val()
		expect(val).toEqual({ p: 1, y: 4, m: 0 })

		const key = snapshot.key
		expect(key).toBe('q')
		IsTrue<IsSame<typeof key, 'q'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('p')).toBe(true)
		expect(snapshot.hasChild('b')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [0, 1, 4]
		snapshot.forEach((child, i) => {
			expect(child.val()).toBe(arr[i])
		})

		const childVal = snapshot.child('y').val()
		expect(childVal).toBe(4)
		IsTrue<IsSame<typeof childVal, Users['read']['q']['y'] | null>>()
	})

	it('test orderByChild, equalTo', async () => {
		const snapshot = await get(
			query(usersRef('q'), orderByKey(), startAfter('d'))
		)
		const val = snapshot.val()
		expect(val).toEqual({ p: 1, y: 4, m: 0 })

		const key = snapshot.key
		expect(key).toBe('q')
		IsTrue<IsSame<typeof key, 'q'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('p')).toBe(true)
		expect(snapshot.hasChild('b')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [0, 1, 4]
		snapshot.forEach((child, i) => {
			expect(child.val()).toBe(arr[i])
		})

		const childVal = snapshot.child('y').val()
		expect(childVal).toBe(4)
		IsTrue<IsSame<typeof childVal, Users['read']['q']['y'] | null>>()
	})
})
