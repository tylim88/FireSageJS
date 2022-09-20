import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	getDatabase,
	get,
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
	const snapshot = await get(exampleRef('b')) // reading 'b'
	const val = snapshot.val() // { c: boolean | null | undefined, d: { e: number } }
	const exists = snapshot.exists() // boolean
	const size = snapshot.size // number
	const hasChild = snapshot.hasChild('d/e') // boolean, types of argument are all child of b, that is 'c', 'd' or 'd/e'.
	const hasChildren = snapshot.hasChildren() // boolean
	const json = snapshot.toJSON() // object, we have to type cast it
	snapshot.forEach((child, index) => {
		//
		//
		//
		//
		//
		//
		//
		const data = child.val() // the data type of child is null or boolean | undefined or { e: number } because 'b' has 2 direct children: 'c' and 'd'
		//
		//
		//
		//
		//
		const ref = child // DatabaseReference<Example, "b/c"> | DatabaseReference<Example, "b/d">

		// use exhaustive check to narrow down the types
		if (child.key === 'c') {
			// Typescript now know we are looking at node 'b/c'
			//
			//
			//
			//
			//
			const narrowedDataType = child.val() // boolean | null | undefined
			const narrowedRef = child // DataSnapshot<Example, "b/c">
		} else if (child.key === 'd') {
			// Typescript now know we are looking at node 'b/d'
			const narrowedDataType = child.val() // { e:number } | null
			//
			//
			//
			//
			//
			const narrowedRef = child // DataSnapshot<Example, "b/d">
		}
	})

	const hasChild2 = snapshot.hasChild(
		//
		//
		//
		//
		//
		//
		// @ts-expect-error
		'abc'
	) // not ok because 'abc' is not child of 'b'
}
