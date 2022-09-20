import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	PossiblyReadAsNullable,
	createRef,
	getDatabase,
	get,
	PushAble,
	PushAbleOnly,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: number | PossiblyReadAsNullable
	b: number
}>
const exampleRef = createRef<Example>(getDatabase())

get(exampleRef()).then(dataSnapshot => {
	// type of data is { a: number | null | undefined; b: number} | null
	// PossiblyReadAsNullable union node read type with null and undefined
	const data = dataSnapshot.val()
})

// you can union `PossiblyReadAsNullable` to any node
export type Example2 = MetaTypeCreator<
	| {
			b:
				| {
						c: boolean | PossiblyReadAsNullable
						d:
							| {
									e: ServerTimestamp | PossiblyReadAsNullable
							  }
							| PossiblyReadAsNullable
				  }
				| PossiblyReadAsNullable
			f:
				| Record<string, 'a' | 'b' | 'c' | PossiblyReadAsNullable>
				| PossiblyReadAsNullable
			i:
				| NumericKeyRecord<boolean | PossiblyReadAsNullable>
				| PossiblyReadAsNullable
			j:
				| PushAble<1 | 2 | 3 | 4 | PossiblyReadAsNullable>
				| PossiblyReadAsNullable
			k:
				| PushAbleOnly<
						| { l: ServerTimestamp | PossiblyReadAsNullable }
						| PossiblyReadAsNullable
				  >
				| PossiblyReadAsNullable
	  }
	| PossiblyReadAsNullable
>
