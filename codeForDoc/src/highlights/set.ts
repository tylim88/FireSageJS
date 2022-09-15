import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	set,
	serverTimestamp,
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
	i: NumericKeyRecord<string>
}>

const exampleRef = createRef<Example>()

;async () => {
	await set(exampleRef('b/d'), { e: serverTimestamp() }) // ok
	await set(exampleRef('b/d/e'), serverTimestamp()) // ok
	await set(exampleRef('f'), { xyz: 'a' }) // ok
	await set(exampleRef('f/xyz'), 'b') // ok

	// await set(exampleRef('b/c/d'), 1)
}
