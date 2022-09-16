import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	set,
	serverTimestamp,
	getDatabase,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	b:
		| {
				c: boolean | Removable
				d: {
					e: ServerTimestamp
				}
		  }
		| Removable
	f: Record<string, 'a' | 'b' | 'c'>
	i: NumericKeyRecord<boolean>
}>

const exampleRef = createRef<Example>(getDatabase())

;async () => {
	await set(exampleRef('b/d'), { e: serverTimestamp() }) // ok
	await set(exampleRef('b/d/e'), serverTimestamp()) // ok
	await set(exampleRef('f'), { xyz: 'a' }) // ok
	await set(exampleRef('f/xyz'), 'b') // ok
	await set(exampleRef('i'), { 123: false }) // ok
	await set(exampleRef('i/123'), false) // ok
	//
	//
	//
	await set(
		exampleRef('b/d/e'),
		// @ts-expect-error
		'incorrect value'
	) // not ok, incorrect value
	//
	//
	//
	//
	//
	//
	await set(
		exampleRef('f'),
		// @ts-expect-error
		{ 123: 'a' }
	) // not ok, expect the key to be non-numeric string
	//
	//
	//
	//
	//
	//
	await set(
		// @ts-expect-error
		exampleRef('f/123'),
		'b'
	) // not ok, expect the key to be non-numeric string
	//
	//
	//
	//
	//
	//
	await set(exampleRef('i'), {
		// @ts-expect-error
		abc: false,
	}) // not ok, expect the key to be numeric string
}
