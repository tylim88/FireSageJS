import {
	MetaTypeCreator,
	createRef,
	getDatabase,
	PushAble,
	push,
	set,
	update,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: PushAble<{ c: number }>
	b: Record<string, { c: number }>
}>
const exampleRef = createRef<Example>(getDatabase())

push(exampleRef('a'), { c: 123 }) // ok, 'a' is PushAble

set(exampleRef('a'), { someKey: { c: 123 } }) // ok, 'a' is PushAble

update(exampleRef(), ['a'], [{ someKey: { c: 123 } }]) // ok, 'a' is PushAble
