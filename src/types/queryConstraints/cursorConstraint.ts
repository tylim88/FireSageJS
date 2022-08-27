import { ErrorInvalidFirebaseKey } from './error'
import { Cursor } from './queryConstraint'
import { IsValidKey } from '../utils'

export type CursorConstraint = <
	V extends string | boolean | number | null,
	K extends string = never
>(
	value: V,
	key?: K extends never ? K : IsValidKey<K, K, ErrorInvalidFirebaseKey>
) => Cursor<V, K>
