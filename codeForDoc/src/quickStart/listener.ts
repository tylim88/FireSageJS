import { exampleRef } from './createRef'
import {
	orderByKey,
	orderByValue,
	startAt,
	endAt,
	limitToFirst,
	limitToLast,
	query,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	onChildMoved,
	onValue,
} from 'firesagejs'

// onChild listener only listen to node of type Record<string, T>, PushAbleOnly<T> or NumericKeyRecord<T> can be listened, similar rule to query
// onValue listener can listen to any node
// can listen to both ref and query
// every listener can accept onError callback and options, both are optional
// snapshot typing mechanism is same as 'get' snapshot

onChildAdded(
	query(exampleRef('i'), orderByValue(), startAt('abc', '1'), limitToFirst(4)),
	snapshot => {}
)

onChildChanged(
	exampleRef('g'),
	snapshot => {},
	error => {} // optional, onError callback
)

onChildRemoved(
	query(exampleRef('f'), orderByKey(), endAt('abc'), limitToLast(2)),
	snapshot => {},
	{ onlyOnce: false } // optional, options
)

onChildMoved(
	exampleRef('f'),
	snapshot => {},
	error => {}, // optional, onError callback
	{ onlyOnce: false } // optional, options
)

onValue(
	exampleRef('b/d/e'),
	snapshot => {},
	error => {}, // optional, onError callback
	{ onlyOnce: false } // optional, options
)
