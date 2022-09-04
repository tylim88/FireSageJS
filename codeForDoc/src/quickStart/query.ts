import { exampleRef } from './createRef'
import {
	get,
	orderByChild,
	orderByKey,
	orderByValue,
	startAt,
	startAfter,
	endAt,
	endBefore,
	equalTo,
	limitToFirst,
	limitToLast,
	query,
} from 'firesagejs'
;async () => {
	const snapshot = await get(
		query(exampleRef('i'), orderByValue(), startAt('abc', '1'), limitToFirst(4))
	)
	const snapshot2 = await get(
		query(exampleRef('f'), orderByKey(), endAt('abc'), limitToLast(2))
	)
	const snapshot3 = await get(
		query(
			exampleRef('g'),
			orderByChild('j/k'),
			endAt(false, 'a1b2c3'),
			limitToLast(2)
		)
	)
}
