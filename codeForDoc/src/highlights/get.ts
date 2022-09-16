import {
	MetaTypeCreator,
	ServerTimestamp,
	NumericKeyRecord,
	Removable,
	createRef,
	getDatabase,
	get,
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
const exampleRef = createRef<Example>(getDatabase())

;async () => {
	const snapshot = await get(exampleRef('b')) // reading 'b'
}
