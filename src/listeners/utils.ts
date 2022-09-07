import {
	OriDataSnapshot,
	GetOnChildSnapshot,
	DataSnapshot,
	ListenOptions,
	Query,
	DatabaseReference,
} from '../types'
import { dataSnapshotTransformer } from '../utils'
import {
	onChildAdded,
	onChildChanged,
	onChildMoved,
	onChildRemoved,
	onValue,
} from 'firebase/database'

export const isListenOptions = (value: unknown): value is ListenOptions => {
	const v = value as Partial<ListenOptions>
	return v?.onlyOnce !== undefined // onlyOnce is boolean, so check for undefined
}

const callbackTransformer =
	(
		callback:
			| ((dataSnapshot: GetOnChildSnapshot<any, any>) => unknown)
			| ((dataSnapshot: DataSnapshot<any, any>) => unknown)
	) =>
	(dataSnapshot: OriDataSnapshot) => {
		// @ts-expect-error
		return callback(dataSnapshotTransformer(dataSnapshot))
	}

export const listenerCreator = (
	listener:
		| typeof onChildAdded
		| typeof onChildChanged
		| typeof onChildMoved
		| typeof onChildRemoved
		| typeof onValue,
	query: Query<any, any> | DatabaseReference<any, any>,
	callback:
		| ((dataSnapshot: GetOnChildSnapshot<any, any>) => unknown)
		| ((dataSnapshot: DataSnapshot<any, any>) => unknown),
	cancelCallback: ListenOptions | ((error: Error) => unknown) | undefined,
	options: unknown // ! why type of options is unknown
) => {
	const cancelCallback_ = isListenOptions(cancelCallback)
		? () => {
				//
		  }
		: cancelCallback ||
		  (() => {
				//
		  })
	const options_ = isListenOptions(cancelCallback)
		? cancelCallback
		: options || {}
	const callback_ = callbackTransformer(callback)

	return listener(
		query as any, // ! Schrödinger's error
		callback_,
		cancelCallback_,
		options_ as any // ! Schrödinger's error
	)
}
