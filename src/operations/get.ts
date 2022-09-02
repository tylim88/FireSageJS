import { get as get_ } from 'firebase/database'
import { Get } from '../types'
import { dataSnapshotTransformer } from '../utils'

// @ts-expect-error
export const get: Get = query => {
	return get_(query).then(dataSnapshot => {
		return dataSnapshotTransformer(dataSnapshot)
	})
}
