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
