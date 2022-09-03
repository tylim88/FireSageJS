import {
	MetaTypeCreator,
	ServerTimestamp,
	PushAbleOnly,
	PseudoArray,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: 1 | 2 | 3
	b: { c: boolean; d: { e: ServerTimestamp } }
	f: Record<string, 'a' | 'b' | 'c'> // index signature
	g: PushAbleOnly<{ h: number }> // basically Record<string, { g: number }>, the extra bit is its child can only be created via `push` method
	i: PseudoArray<string> // basically Record<number, string>
}>
