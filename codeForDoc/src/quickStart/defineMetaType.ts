import {
	MetaTypeCreator,
	ServerTimestamp,
	PushAbleOnly, // field type, special index signature, is Record<string, T> under the hood
	NumericKeyRecord, // field type, special index signature, is Record<number, T> under the hood
	Removable, // field type, utility
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: 1 | 90 | 3700
	b: {
		c: boolean | Removable // only Removable node can be removed via `remove` function.
		d: {
			e: ServerTimestamp // ServerTimestamp node only accept server timestamp and not number.
		}
	}
	f: Record<string, 'a' | 'b' | 'c'> // normal index signature
	g: PushAbleOnly<{ h: number }> // the child of PushAbleOnly node can only be created via `push` function.
	i: NumericKeyRecord<string> // Firesage replaces all numeric key node { 1:'a', 2:'b', 3:'c' } with error message, please use NumericKeyRecord instead
}>
