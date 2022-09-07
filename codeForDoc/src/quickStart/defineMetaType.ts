import {
	MetaTypeCreator,
	ServerTimestamp,
	PushAbleOnly,
	NumericKeyRecord,
	Removable,
} from 'firesagejs'

export type Example = MetaTypeCreator<{
	a: 1 | 90 | 3700
	b:
		| {
				c: boolean | Removable
				d: {
					e: ServerTimestamp
				}
		  }
		| Removable
	f: Record<string, 'a' | 'b' | 'c'>
	g: PushAbleOnly<{ h: number; j: { k: boolean } }>
	i: NumericKeyRecord<string>
}>
