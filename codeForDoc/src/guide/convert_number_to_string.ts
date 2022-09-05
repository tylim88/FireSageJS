import {
	MetaTypeCreator,
	NumericKeyRecord,
	createRef,
	update,
} from 'firesagejs'

type Example = MetaTypeCreator<{
	a: NumericKeyRecord<boolean>
}>

const ref = createRef<Example>()

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
