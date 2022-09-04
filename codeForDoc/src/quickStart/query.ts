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

// only node of type Record<string, T>, PushAbleOnly<T> or NumericKeyRecord<T> can be queried
// orderBy clause must exist in order to use cursors (qualTo, endAt... etc etc)
// there can be only one orderBy clause (reduce runtime exception)
// the type of cursor 1st argument must be at most string | boolean | number | null
// the 2nd argument of cursor is optional except when order by key
// any combination of cursor below will trigger type error(to reduce runtime exception):
// startAt and startAfter
// endAt and endBefore
// equalTo and any other cursor
// any cursor and itself
;async () => {
	const snapshot = await get(
		query(
			exampleRef('i'),
			orderByValue(),
			// only Record<string, primitive>, PushAbleOnly<primitive> or NumericKeyRecord<primitive> can be ordered by value
			// the type of node 'i' is NumericKeyRecord<string>, hence the 1st argument type is string
			// and the 2nd argument type is numeric string because the key of NumericKeyRecord is `${number}`
			startAt('abc', '1'),
			// limit accept numeric literal that is not negative or float
			// limit also accept the wide type number(for those who rely on runtime value)
			limitToFirst(4)
		)
	)
	const snapshot2 = await get(
		query(
			exampleRef('f'),
			orderByKey(),
			// when order by key:
			// there would be no 2nd argument
			// the 1st type argument must be non numeric string or numeric string
			// in this case it is non numeric string because 'f' is Record<string, 'a' | 'b' | 'c'>
			endAt('abc'),
			limitToLast(2)
		)
	)
	const snapshot3 = await get(
		query(
			// only Record<string, non-primitive>, PushAbleOnly<non-primitive> or NumericKeyRecord<non-primitive> can be ordered by child
			exampleRef('g'),
			// the type of orderByChild argument is relative paths of 'g' grandchildren node
			// type of 'g' node is PushAbleOnly<{ h: number; j: { k: boolean } }>
			// so the valid types are 'h' and 'j/k'
			// 'j' is not a valid type because the type of node 'j' is non-primitive
			// in this case the error suggestion will appear on the cursor instead
			orderByChild('j/k'),
			// the 1st argument is boolean because the type of node 'j/k' is boolean
			// in this case it is non numeric string because 'f' is Record<string, 'a' | 'b' | 'c'>
			// and the 2nd argument type is non-numeric string because the key of PushAbleOnly is string
			endAt(false, 'a1b2c3'),
			limitToLast(2)
		)
	)
}
