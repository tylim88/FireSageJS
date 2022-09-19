import { get } from './get'
import { initializeApp, dataForQueryTests, Users } from '../utilForTests'
import { query, createRef } from '../refs'
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
import { IsTrue, IsSame, DataSnapshot, Ref } from '../types'
import firebasejson from '../../firebase.json'
import {
	initializeTestEnvironment,
	RulesTestContext,
	RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import fs from 'fs'

// have to use rules unit testing here
// If emulator with database is detected, everything will use emulator, regardless explicitly connect to emulator or not
// and emulator will use local database rules
// this is not a problem, but emulator cannot read local database rules in github action
// the only way to read local rule is explicitly state where the rules file located in code
// we can explicitly state the file location in rules unit testing

initializeApp()

const port = firebasejson.emulators.database.port
let db = undefined as unknown as ReturnType<RulesTestContext['database']>
let testEnv = undefined as unknown as RulesTestEnvironment
let usersRef = undefined as unknown as Ref<Users>

describe('test get and query', () => {
	beforeAll(async () => {
		testEnv = await initializeTestEnvironment({
			projectId: 'any',
			database: {
				host: 'localhost',
				port,
				rules: fs.readFileSync(firebasejson.database.rules, 'utf8'),
			},
		})
		await testEnv.clearDatabase()
		db = testEnv
			.authenticatedContext('alice', {
				email: 'alice@example.com',
			})
			.database()
		usersRef = createRef<Users>(db)
		return set(usersRef(), dataForQueryTests())
	})
	afterAll(() => {
		testEnv.cleanup()
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
			IsTrue<IsSame<typeof child, DataSnapshot<Users, `o/${string}`>>>()
			expect(child.val()).toBe(arr[i])
		})

		const child = snapshot.child('x')
		IsTrue<IsSame<typeof child, DataSnapshot<Users, `o/${string}`>>>()
		const childVal = child.val()
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
			IsTrue<IsSame<typeof child, DataSnapshot<Users, `u/${number}`>>>()
			expect(child.val()).toBe(arr[i])
		})

		const child = snapshot.child('2')
		IsTrue<IsSame<typeof child, DataSnapshot<Users, `u/${number}`>>>()
		const childVal = child.val()
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
			IsTrue<IsSame<typeof child, DataSnapshot<Users, `q/${string}`>>>()
			expect(child.val()).toBe(arr[i])
		})

		const child = snapshot.child('y')
		IsTrue<IsSame<typeof child, DataSnapshot<Users, `q/${string}`>>>()
		const childVal = child.val()
		expect(childVal).toBe(4)
		IsTrue<IsSame<typeof childVal, Users['read']['q']['y'] | null>>()
	})

	it('test orderByChild, endAt', async () => {
		const snapshot = await get(
			query(usersRef('b/h/abc/p'), orderByChild('r'), endAt(6354))
		)
		const val = snapshot.val()
		expect(val).toEqual({ i: { r: 6354 }, g: { r: 3426 }, c: { r: 3721 } })

		const key = snapshot.key
		expect(key).toBe('p')
		IsTrue<IsSame<typeof key, 'p'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('g')).toBe(true)
		expect(snapshot.hasChild('o')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [{ r: 3426 }, { r: 3721 }, { r: 6354 }]
		snapshot.forEach((child, i) => {
			IsTrue<
				IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/p/${string}`>>
			>()
			expect(child.val()).toEqual(arr[i])
		})

		const child = snapshot.child('c')
		IsTrue<
			IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/p/${string}`>>
		>()
		const childVal = child.val()
		expect(childVal).toEqual({ r: 3721 })
		IsTrue<
			IsSame<
				typeof childVal,
				| {
						r: number | undefined | null
				  }
				| null
				| undefined
			>
		>()
	})

	it('test orderByChild, endBefore with key', async () => {
		const snapshot = await get(
			query(usersRef('b/h/abc/m'), orderByChild('n'), endBefore('2', 'x'))
		)
		const val = snapshot.val()
		expect(val).toEqual({ x: { n: '1' }, c: { n: '2' } })

		const key = snapshot.key
		expect(key).toBe('m')
		IsTrue<IsSame<typeof key, 'm'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('c')).toBe(true)
		expect(snapshot.hasChild('v')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [{ n: '1' }, { n: '2' }]
		snapshot.forEach((child, i) => {
			IsTrue<
				IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/m/${string}`>>
			>()
			expect(child.val()).toEqual(arr[i])
		})

		const child = snapshot.child('x')
		IsTrue<
			IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/m/${string}`>>
		>()
		const childVal = child.val()
		expect(childVal).toEqual({ n: '1' })
		IsTrue<
			IsSame<
				typeof childVal,
				| {
						n: '1' | '2' | '7' | '8' | '9' | undefined | null
				  }
				| null
				| undefined
			>
		>()
	})
	it('test orderByChild, equalTo with key', async () => {
		const snapshot = await get(
			query(usersRef('b/h/abc/s'), orderByChild('t'), equalTo(3297, '64'))
		)
		const val = snapshot.val()
		expect(val).toEqual({ 64: { t: 3297 } })

		const key = snapshot.key
		expect(key).toBe('s')
		IsTrue<IsSame<typeof key, 's'>>()

		expect(snapshot.size).toBe(val ? Object.keys(val).length : val)
		expect(snapshot.exists()).toBe(true)
		expect(snapshot.hasChild('64')).toBe(true)
		expect(snapshot.hasChild('91')).toBe(false)
		expect(snapshot.hasChildren()).toBe(true)

		const json = snapshot.toJSON()
		expect(json).toEqual(val)

		const arr = [{ t: 3297 }]
		snapshot.forEach((child, i) => {
			IsTrue<
				IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/s/${number}`>>
			>()
			expect(child.val()).toEqual(arr[i])
		})

		const child = snapshot.child('64')
		IsTrue<
			IsSame<typeof child, DataSnapshot<Users, `b/h/${string}/s/${number}`>>
		>()
		const childVal = child.val()
		expect(childVal).toEqual({ t: 3297 })
		IsTrue<
			IsSame<
				typeof childVal,
				| {
						t: number | undefined | null
				  }
				| null
				| undefined
			>
		>()
	})
})
