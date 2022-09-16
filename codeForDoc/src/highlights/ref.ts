import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
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

const exampleRef = createRef<Example>(getDatabase()) // firesage ref

exampleRef() // point to 'root' node, type is --too long, skipped--
exampleRef('b') // point to 'b' node, type is --too long, skipped--
exampleRef('b/d/e') // point to 'b/d/e' node, write type is ServerTimestamp, compare and read type is number
exampleRef('f') // point to 'f' node, type is Record<string, { h: number; j: { k: boolean } }>
exampleRef('f/abc') // point to 'f/abc' node, type is { h: number; j: { k: boolean } }
exampleRef('f/x1') // alphanumeric key is considered as non-numeric key
exampleRef('i') // point to 'i' node, type is Record<`${number}`, string>
exampleRef('i/123') // point to 'i/123' node, type is string
//
//
//
//
//
// @ts-expect-error
exampleRef('b/c/d') // not ok, path not exist
//
//
//
//
//
// @ts-expect-error
exampleRef('f/123') // not ok, expect non-numeric key because f is Record<string, 'a' | 'b' | 'c'>
//
//
//
//
//
// @ts-expect-error
exampleRef('i/abc') // not ok, expect numeric key because i is NumericKeyRecord<boolean>
