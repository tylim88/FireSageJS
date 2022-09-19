import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	getDatabase,
	query,
	PushAbleOnly,
	orderByValue,
	endBefore,
	startAt,
	limitToFirst,
	startAfter,
	endAt,
	limitToLast,
	orderByKey,
	orderByChild,
	equalTo,
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
	f: Record<string, 1 | 2 | 3 | 4 | 5>
	i: NumericKeyRecord<boolean>
	j: PushAbleOnly<{ k: null; l: { m: number } }>
}>

const exampleRef = createRef<Example>(getDatabase()) // firesage ref
/*
=======
OK
=======
*/
query(
	exampleRef('f'),
	orderByValue(),
	// 1st argument type is the type of node 'f' child
	// 2nd argument is optional, the type is type of key
	// the type of key can only be numeric string or non-numeric string
	// in this case the type of 2nd argument is numeric string because the type of 'f' is Record<string, 1 | 2 | 3 | 4 | 5>
	startAt(1, 'xyz'),
	endBefore(5),
	limitToFirst(2)
)

query(
	exampleRef('i'),
	orderByKey(),
	// when orderbyKey, the type of 1st argument is the type of key
	// the type of key can only be numeric string or non-numeric string
	// in this case it is numeric string because the type of 'i' is NumericKeyRecord<boolean>
	// no 2nd argument
	startAfter('24'),
	endAt('100'),
	limitToLast(5)
)

query(
	exampleRef('j'),
	// relative path must start at grandchildren which is 'k','l' and 'l/j'
	// 'l' however is not valid because the type of 'l' is object literal and cannot be ordered
	orderByChild('l/m'),
	// 1st argument type is the type of node 'l/j' child
	// 2nd argument is optional, the type is type of key
	// the type of key can only be numeric string or non-numeric string
	// in this case the type of 2nd argument is numeric string because the type of 'f' is Record<string, 1 | 2 | 3 | 4 | 5>
	equalTo(1, 'abc')
)
/*
=======
not OK
=======
*/
query(
	// can only order by node with one signature children
	// b has 2 children with different signatures
	// @ts-expect-error
	exampleRef('b')
)

query(
	exampleRef('f'),
	// must has one orderBy to use cursor
	// @ts-expect-error
	startAt(1)
)

query(
	exampleRef('f'),
	orderByValue(),
	// not ok, duplicated cursor
	// @ts-expect-error
	startAt(1, 'xyz'),
	startAt(1, 'xyz'),
	limitToFirst(2)
)

query(
	exampleRef('f'),
	orderByValue(),
	// not ok, you cant use startAt with startAfter
	//
	//
	//
	//
	// @ts-expect-error
	startAt(1, 'xyz'),
	startAfter(1, 'xyz'),
	limitToFirst(2)
)

query(
	exampleRef('f'),
	orderByValue(),
	// not ok, you cant use endAt with endBefore
	//
	//
	//
	//
	// @ts-expect-error
	endAt(1, 'xyz'),
	endBefore(5),
	limitToFirst(2)
)

query(
	exampleRef('f'),
	orderByValue(),
	// not ok, you cant use equalTo with any other cursor
	//
	//
	//
	//
	// @ts-expect-error
	equalTo(1, 'xyz'),
	endBefore(5),
	limitToFirst(2)
)

query(
	exampleRef('f'),
	orderByValue(),
	startAt(1, 'abc'),
	// not ok, incorrect value type, expect number
	// @ts-expect-error
	endBefore(true),
	limitToFirst(2)
)

query(
	exampleRef('i'),
	orderByKey(),
	// not ok, orderByKey don't need 2nd argument
	// @ts-expect-error
	startAfter('24', 'someKey'),
	endAt('100'),
	limitToLast(5)
)

query(
	exampleRef('i'),
	orderByKey(),
	// not ok, when orderByKey the 1st argument must be the type of key
	// in this case, expect numeric string
	// @ts-expect-error
	startAfter(false),
	endAt('100'),
	limitToLast(5)
)

query(
	exampleRef('i'),
	orderByKey(),
	// not ok, expect numeric string because `i` is numeric Record
	// @ts-expect-error
	endAt('abc'),
	limitToLast(5)
)

query(
	exampleRef('j'),
	orderByKey(),
	// not ok, expect non-numeric string because `j` is PushAbleOnly
	// @ts-expect-error
	endBefore('123')
)

query(
	exampleRef('j'),
	// not ok, illegal child type or path must start at grandchild path
	// @ts-expect-error
	orderByChild('abc')
)

query(
	exampleRef('j'),
	// not ok, there can be only one orderBy*
	// @ts-expect-error
	orderByKey(),
	orderByChild('l/m')
)
