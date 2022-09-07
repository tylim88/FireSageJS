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
	limitToFirst,
	push,
	remove,
	runTransaction,
	onValue,
	onChildAdded,
	MetaTypeCreator,
	createRef,
	increment,
	Ref,
	PushAbleOnly,
	Removable,
} from 'firesagejs'
import firebasejson from '../../../firebase.json'
import fs from 'fs'

type Users = MetaTypeCreator<
	Record<string, { a: number; b: boolean }> | Removable
>

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
		await set(ref, { user1: { a: 1, b: true } })
		// do your assertion here
	})
	it('test update', async () => {
		const ref = usersRef()
		const childPath = 'a'
		await update(ref, ['user1/a'], [increment(100)])
		// do your assertion here
	})
	it('test get', async () => {
		await set(usersRef(), { user1: { a: 100, b: true } })
		const snapshot = await get(
			query(usersRef(), orderByValue(), limitToFirst(2))
		)
		// do your assertion here
	})
	it('test push', async () => {
		type PushAbleUsers = MetaTypeCreator<
			PushAbleOnly<{ a: number; b: boolean }>
		>
		const pushAbleUserRef = createRef<PushAbleUsers>(db)()
		await push(pushAbleUserRef, { a: 123, b: true })
		// do your assertion here
	})
	it('test remove', async () => {
		const ref = usersRef()
		await set(ref, { abc: { a: 5, b: false } })
		await remove(ref)
		// do your assertion here
	})
	it('test transaction ', async () => {
		const result = await runTransaction(
			usersRef('user1/b'),
			() => {
				return false
			},
			{ applyLocally: true }
		)
		// do your assertion here
	})
	it('test onValue', done => {
		const ref = usersRef('user1/a')
		expect.hasAssertions()
		const unsub = onValue(
			ref,
			async dataSnapshot => {
				// do your assertion here
			},
			{ onlyOnce: true }
		)
		set(ref, 789).then(() => {
			unsub()
			done()
		})
	})
	it('test onChildAdded', done => {
		const ref = usersRef()
		expect.hasAssertions()
		const unsub = onChildAdded(
			query(ref),
			async dataSnapshot => {
				// do your assertion here
			},
			{ onlyOnce: false }
		)
		set(ref, { user99: { a: 123, b: true } }).then(() => {
			unsub()
			done()
		})
	})
})
