import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	getDatabase,
	remove,
	get,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: number | Removable
	b: number
}>
const exampleRef = createRef<Example>(getDatabase())

remove(exampleRef('a')) // ok
//
//
//
//
//
//
remove(
	// @ts-expect-error
	exampleRef('b')
) // not ok, because b is not removable

get(exampleRef()).then(dataSnapshot => {
	// type of data is { a: number | null | undefined; b: number} | null
	// Removable union node read type with null and undefined
	//
	//
	//
	//
	//
	//
	//
	//
	const data = dataSnapshot.val()
})

// you can union `Removable` to any node
export type Example2 = MetaTypeCreator<
	| {
			b:
				| {
						c: boolean | Removable
						d:
							| {
									e: ServerTimestamp | Removable
							  }
							| Removable
				  }
				| Removable
			f: Record<string, 'a' | 'b' | 'c' | Removable> | Removable
			i: NumericKeyRecord<boolean | Removable> | Removable
	  }
	| Removable
>
