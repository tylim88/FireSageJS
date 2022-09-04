import {
	MetaTypeCreator,
	ServerTimestamp,
	PushAbleOnly, // field type, special index signature, is Record<string, T> under the hood
	NumericKeyRecord, // field type, special index signature, is Record<`${number}`, T> under the hood
	Removable, // field type, utility
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: 1 | 90 | 3700
	b: {
		c: boolean | Removable // only Removable node can be removed via `remove` function.
		d: {
			e: ServerTimestamp // ServerTimestamp node write as serverTimestamp and read as number, write as number is not possible.
		}
	}
	f: Record<string, 'a' | 'b' | 'c'> // normal index signature, any the key related argurment operate on this node only accept non-numeric string
	g: PushAbleOnly<{ h: number; j: { k: boolean } }> // the child of PushAbleOnly node can only be created via `push` function, any the key related argurment operate on this node only accept non-numeric string
	i: NumericKeyRecord<string> // Firesage replaces all numeric key node { 1:'a', 2:'b', 3:'c' } with error message, use NumericKeyRecord instead. Any the key related argurment operate on this node only accept numeric string
}>

// note: alphanumeric is considered as non-numeric string
// primitive can union with primitive type and Removable
// non-primitive type cannot union with any other type(except Removable), otherwise Firesage will replaces the type with an error message.
// FireSage able to deduce the correct type even if you:
// nest Record, PushAbleOnly and NumericKeyRecord into each other, eg NumericKeyRecord<Record<PushAbleOnly<{ a: number }>>>
// union Removable in any way, eg { g : PushAbleOnly<{ h: number | Removable } | Removable> | Removable > | Removable
