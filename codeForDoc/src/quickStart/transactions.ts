import { exampleRef } from './createRef'
import { runTransaction } from 'firesagejs'

// type of 'g' node is PushAbleOnly<{ h: number; j: { k: boolean } }>
// hence the return is { { h: number; j: { k: boolean } }
;async () => {
	const result = await runTransaction(
		exampleRef('g/a1b2c3'),
		() => {
			return { h: 123, j: { k: false } }
		},
		{ applyLocally: true } // optional, options
	)

	const committed = result.committed // boolean
	const snapshot = result.snapshot // typing mechanism is same as 'get' snapshot work
	const json = result.toJSON() // object
}
