import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	createRef,
	getDatabase,
	get,
	PushAble,
	PushAbleOnly,
} from 'firesagejs'

export type Example = MetaTypeCreator<
	{
		b: {
			c: boolean
			d: {
				e: ServerTimestamp
			}
		}
		f: Record<string, 'a' | 'b' | 'c'>
		i: NumericKeyRecord<boolean>
		j: PushAble<1 | 2 | 3 | 4>
		k: PushAbleOnly<{ l: ServerTimestamp }>
	},
	{ AllNodesPossiblyReadAsNullable: true }
>

const exampleRef = createRef<Example>(getDatabase())

get(exampleRef()).then(dataSnapshot => {
	// AllNodesPossiblyReadAsNullable union all nodes read type with null and undefined
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
