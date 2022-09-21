import {
	MetaTypeCreator,
	createRef,
	getDatabase,
	push,
	set,
	update,
	NumericKeyRecord,
} from 'firesagejs'

type Example = MetaTypeCreator<{
	a: NumericKeyRecord<{ c: number }>
	b: Record<string, { c: number }>
}>

const exampleRef = createRef<Example>(getDatabase())

set(exampleRef('a'), { 123: { c: 999 } }) // ok, key is numeric
set(exampleRef('a'), [{ c: 999 }, { c: 111 }]) // ok, accept array, store in db as { 1:{ c: 999 }, 2:{ c: 111 } }
set(exampleRef('b'), { abc: { c: 999 } }) // ok, key is non-numeric

update(exampleRef('a'), ['123'], [{ c: 999 }]) // ok, key is numeric
update(exampleRef('b'), ['a1b2c3'], [{ c: 999 }]) // ok, key is non-numeric
update(
	exampleRef(),
	['a', 'b'],
	[[{ c: 999 }, { c: 111 }], { abc: { c: 999 }, efg: { c: 111 } }]
) // ok, accept array, store in db as { a: { 1: { c: 999 }, 2: { c: 111 } }, b: { abc: { c: 999 }, efg: { c: 111 } }
//
//
//
//
//
//
//
//
set(exampleRef('a'), {
	// @ts-expect-error
	a1b2c3: { c: 999 },
}) // not ok, expect numeric key
//
//
//
//
//
//
set(
	exampleRef('b'),
	// @ts-expect-error
	{ 123: { c: 999 } }
) // not ok, expect non-numeric key
//
//
//
//
//
//
//
update(
	exampleRef('a'),
	[
		// @ts-expect-error
		'abc',
	],
	[{ c: 999 }]
) // not ok, expect numeric key
//
//
//
//
//
update(
	exampleRef('b'),
	[
		// @ts-expect-error
		'123',
	],
	[{ c: 999 }]
) // not ok, expect non-numeric key
//
//
//
//
//
//
push(
	// @ts-expect-error
	exampleRef('a'),
	{ 123: { c: 999 } }
) // ok, cannot push NumericKeyRecord<T>
//
//
//
//
//
//
push(
	// @ts-expect-error
	exampleRef('b'),
	{ abc: { c: 999 } }
) // ok, cannot push Record<string, T>
//
//
//
//
//
//
//
update(
	exampleRef('a'),
	[
		// @ts-expect-error
		123,
	],
	[{ c: 999 }]
) // ok, is number but expect numeric string

// Record<`${number}`, T> and Record<number, T> is invalid type.
// use NumericKeyRecord<T> instead
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
type Example2 = MetaTypeCreator<{
	a: Record<`${number}`, { c: number }>
	b: Record<number, { c: number }>
}>
