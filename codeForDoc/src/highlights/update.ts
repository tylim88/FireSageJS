import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	update,
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
	await update(
		exampleRef(), // base path is root
		['b/d', 'f/xyz', 'i'], // child path of 'root'
		[{ e: serverTimestamp() }, 'a', { 123: false }] // data of 'b/d', 'f/xyz', 'i'respectively
	)
	await update(
		exampleRef('b'), // base path is 'b'
		['d', 'c'], // child path of b
		[{ e: serverTimestamp() }, false] // data of 'b/d', 'b/c' respectively
	)
	await update(
		exampleRef(), // base path is root
		['b', 'f', 'i'], // child path of 'root'
		[
			{ c: true, d: { e: serverTimestamp() } },
			{ xyz: 'a' },
			[true, false, true, false], // 'i' is NumericKeyRecord can accept array as write value
		] // data of 'b', 'f', 'i'respectively
	)
	await update(
		exampleRef(), // base path is root
		['b/d', 'f/xyz', 'i'], // child path of 'root'
		//
		//
		//
		//
		//
		//
		// @ts-expect-error
		[{ e: serverTimestamp() }, 'a'] // not ok, the number of values does not match the number of paths
	)
	await update(
		exampleRef('b'), // base path is 'b'
		//
		//
		//
		//
		//
		//
		[
			'd',
			// @ts-expect-error
			'f/xyz',
			// @ts-expect-error
			'i',
		], // not ok, 'b/d', 'f/xyz', 'i' are not child path of 'b'
		[]
	)
	await update(
		exampleRef(), // base path is root
		['b/c', 'f', 'i/123'], // child path of 'root'
		//
		//
		//
		//
		[
			false,
			// @ts-expect-error
			{ 456: 'b' },
			false,
		] // not ok, the key of 'f' should be non-numeric
	)
	await update(
		exampleRef(), // base path is root
		//
		//
		//
		//
		//
		//
		// @ts-expect-error
		['i/abc'], // not ok, the key of 'i' should be numeric
		[false]
	)
	await update(
		exampleRef('b'), // base path is 'b'
		//
		//
		//
		//
		[
			'd',
			// @ts-expect-error
			'd/e',
		], // not ok, because 'd/e' is child path of 'd'
		[]
	)
}
