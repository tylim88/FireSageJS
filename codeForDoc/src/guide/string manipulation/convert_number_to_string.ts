import {
	MetaTypeCreator,
	NumericKeyRecord,
	createRef,
	update,
	getDatabase,
} from 'firesagejs'

type Example = MetaTypeCreator<{
	a: NumericKeyRecord<boolean>
}>

const ref = createRef<Example>(getDatabase())

const numericKey = 123

update(
	ref('a'),
	[numericKey.toString()],
	[
		// @ts-expect-error
		true,
	]
) // the data type is never
//
//
//
//
//
//
//
update(
	ref('a'),
	[
		// @ts-expect-error
		numericKey,
	],
	[true]
)

update(ref('a'), [`${numericKey}`], [true])
