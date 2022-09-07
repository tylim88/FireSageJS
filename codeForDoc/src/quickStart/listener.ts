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

const unsub = onChildAdded(
	query(exampleRef('i'), orderByValue(), startAt('abc', '1'), limitToFirst(4)),
	snapshot => {}
)

const unsub2 = onChildChanged(
	exampleRef('g'),
	snapshot => {},
	error => {} // optional, onError callback
)

const unsub3 = onChildRemoved(
	query(exampleRef('f'), orderByKey(), endAt('abc'), limitToLast(2)),
	snapshot => {},
	{ onlyOnce: false } // optional, options
)

const unsub4 = onChildMoved(
	exampleRef('f'),
	snapshot => {},
	error => {}, // optional, onError callback
	{ onlyOnce: false } // optional, options
)

const unsub5 = onValue(
	exampleRef('b/d/e'),
	snapshot => {},
	error => {}, // optional, onError callback
	{ onlyOnce: false } // optional, options
)
