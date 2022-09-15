import { exampleRef } from './createRef'
import { runTransaction } from 'firesagejs'
;async () => {
	const result = await runTransaction(
		exampleRef('g/a1b2c3'),
		data => {
			return { h: 123, j: { k: false } }
		},
		{ applyLocally: true }
	)

	const committed = result.committed
	const snapshot = result.snapshot
	const json = result.toJSON()
}
