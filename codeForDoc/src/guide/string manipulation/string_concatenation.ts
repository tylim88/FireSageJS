import { MetaTypeCreator, NumericKeyRecord, createRef } from 'firesagejs'

type Example = MetaTypeCreator<{
	a: { b: NumericKeyRecord<boolean>; c: Record<string, 1 | 2 | 3> }
}>

const ref = createRef<Example>()

const numericKey = 123
const nonNumericKey = 'x7y8z9'

// @ts-expect-error
const ref1 = ref('a/b/' + `${numericKey}`) // type error, type is string!
//
//
//
//
//
//
//
//
//
//
//
// @ts-expect-error
const ref2 = ref('a/c/' + `${nonNumericKey}`) // type error, type is string!

const ref3 = ref(`a/b/${numericKey}`) //ok, type is `a/b/123`!

const ref4 = ref(`a/c/${nonNumericKey}`) // ok, type is `a/c/x7y8z9`!
