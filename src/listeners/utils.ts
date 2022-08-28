import { OriDataSnapshot, GetOnChildSnapshot, DataSnapshot } from '../types'
import { dataSnapshotTransformer } from '../utils'

export const callbackTransformer =
	(
		callback:
			| ((dataSnapshot: GetOnChildSnapshot<any, any>) => unknown)
			| ((dataSnapshot: DataSnapshot<any, any>) => unknown)
	) =>
	(dataSnapshot: OriDataSnapshot) => {
		// @ts-expect-error
		return callback(dataSnapshotTransformer(dataSnapshot))
	}
