import {
	initializeTestEnvironment,
	RulesTestContext,
	RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
	set,
	update,
	query,
	get,
	orderByValue,
	startAt,
	limitToFirst,
	push,
	remove,
	runTransaction,
	onValue,
	onChildAdded,
	onChildChanged,
	onChildMoved,
	onChildRemoved,
	MetaTypeCreator,
	createRef,
	increment,
	serverTimestamp,
	ServerTimestamp,
	Ref,
} from 'firesagejs'
import firebasejson from '../firebase.json'
import {
	generateRandomData,
	initializeApp,
	readAndExpectForSet,
	readAndExpectForUpdate,
	compareListeners,
	dataForQuery,
	Users,
} from './utilForTests'
import fs from 'fs'

initializeApp()
const port = firebasejson.emulators.database.port
let db = undefined as unknown as ReturnType<RulesTestContext['database']>
let testEnv = undefined as unknown as RulesTestEnvironment
let usersRef = undefined as unknown as Ref<Users>

describe('test working with rules unit testing', () => {
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
	})
	afterAll(() => {
		testEnv.cleanup()
	})
	it('test set', async () => {
		const ref = usersRef()
		const data = generateRandomData().data
		await set(ref, data)
		await readAndExpectForSet(ref, undefined, data)
	})
	it('test update', async () => {
		const ref = usersRef()
		const data = generateRandomData().data
		const childPath = 'a'
		await update(ref, [childPath], [data['a']])
		await readAndExpectForUpdate(ref, childPath, data['a'])
	})
	it('test get', async () => {
		await set(usersRef(), dataForQuery())
		const snapshot = await get(
			query(usersRef('o'), orderByValue(), startAt(3), limitToFirst(2))
		)
		const val = snapshot.val()
		expect(val).toEqual({ w: 4, x: 3 })
		const key = snapshot.key
		expect(key).toBe('o')
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
		const child = snapshot.child('x')
		const childVal = child.val()
		expect(childVal).toBe(3)
	})
	it('test push', async () => {
		const ref1 = usersRef('b/h/abc/m')
		await set(ref1, { abc: { n: '1' } })
		await push(ref1, { n: '7' })
		const data1 = (await get(ref1)).val()
		expect(data1).not.toBe(null)
	})
	it('test remove', async () => {
		const ref1 = usersRef('b/h/abc/m')
		await set(ref1, { abc: { n: '7' } })
		await remove(ref1)
		const data1 = (await get(ref1)).val()
		expect(data1).toBe(null)
	})
	it('test transaction ', async () => {
		const result = await runTransaction(
			usersRef('b/d/f'),
			() => {
				return {
					j: 999,
				}
			},
			{ applyLocally: true }
		)
		expect(result.snapshot.val()?.j).toBe(999)
	})
	it('test onValue', done => {
		const rand = generateRandomData()
		const data = rand.data
		const ref = usersRef()
		expect.hasAssertions()
		const unsub = onValue(
			ref,
			async dataSnapshot => {
				compareListeners(undefined, dataSnapshot, data)
			},
			{ onlyOnce: true }
		)
		set(ref, data).then(() => {
			unsub()
			done()
		})
	})
	it('test onChildAdded', done => {
		const rand = generateRandomData()
		const randStringOKey = rand.randStringOKey
		const data = rand.data
		const path = `o` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildAdded(
			query(ref),
			async dataSnapshot => {
				compareListeners(`${path}/${randStringOKey}`, dataSnapshot, data)
			},
			{ onlyOnce: false }
		)
		set(ref, data['o']).then(() => {
			unsub()
			done()
		})
	})
	it('test onChildChanged', done => {
		const rand = generateRandomData()
		const randStringQKey = rand.randStringQKey
		const data = rand.data
		const path = `q` as const
		const ref = usersRef(path)
		const newData = data['q'][randStringQKey] === 0 ? 1 : 0
		expect.hasAssertions()
		const unsub = onChildChanged(query(ref), async dataSnapshot => {
			data['q'][randStringQKey] = newData
			compareListeners(`${path}/${randStringQKey}`, dataSnapshot, data)
		})
		push(ref, data['q'][randStringQKey]!).then(async thenRef => {
			await update(ref, [thenRef.key], [newData])
			unsub()
			done()
		})
	})
	it('onChildRemoved', done => {
		const rand = generateRandomData()
		const data = rand.data
		const path = `u` as const
		const ref = usersRef(path)
		expect.hasAssertions()
		const unsub = onChildRemoved(
			ref,
			async dataSnapshot => {
				compareListeners(`${path}/0`, dataSnapshot, data)
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
	it('test increment', async () => {
		const ref = createRef<MetaTypeCreator<{ a: number }>>()
		const node = ref('a')
		await set(node, -100)
		await set(node, increment(100)) // * unlike firestore, RTDB increment behave like update
		const dataSnapshot = await get(node)
		const data = dataSnapshot.val()
		expect(data).toBe(0)
	})
	it('test server timestamp', async () => {
		const ref = createRef<MetaTypeCreator<{ a: ServerTimestamp }>>()
		const node = ref('a')
		await set(node, serverTimestamp())
		const dataSnapshot = await get(node)
		const data = dataSnapshot.val()
		expect(typeof data).toBe('number')
	})
})
