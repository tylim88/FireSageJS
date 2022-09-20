import {
	MetaTypeCreator,
	createRef,
	getDatabase,
	PushAbleOnly,
	push,
	set,
	update,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: PushAbleOnly<{ c: number }>
	b: Record<string, { c: number }>
}>
const exampleRef = createRef<Example>(getDatabase())

push(exampleRef('a'), { c: 123 }) // ok, 'a' is PushAbleOnly
//
//
//
//
//
push(
	// @ts-expect-error
	exampleRef('b'),
	{ c: 123 }
) // not ok, 'b' is not PushAble or PushAbleOnly
//
//
//
//
//
//
//
set(
	// @ts-expect-error
	exampleRef('a'),
	{ someKey: { c: 123 } }
) // not ok, cannot set PushAbleOnly

set(exampleRef('a/someKey'), { c: 123 }) // ok, 'a/someKey' is not PushAbleOnly
//
//
//
//
//
//
//
update(
	exampleRef(),
	[
		// @ts-expect-error
		'a',
	],
	[{ someKey: { c: 123 } }]
) // not ok, 'a' is PushAbleOnly

update(exampleRef('a'), ['someKey'], [{ c: 123 }]) // ok, 'a/someKey' is not PushAbleOnly
