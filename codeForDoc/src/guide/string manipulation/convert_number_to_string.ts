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

// @ts-expect-error
update(ref('a'), [numericKey.toString()], [true])
//
//
//
//
//
//
//
// @ts-expect-error
update(ref('a'), [numericKey], [true])

update(ref('a'), [`${numericKey}`], [true])
