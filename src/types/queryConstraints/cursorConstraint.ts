import { ErrorInvalidFirebaseKey, ErrorInvalidCursorValue } from './error'
import { CursorConstraint } from './queryConstraint'
import { IsCharacterValid } from '../utils'

export type CursorValue = string | boolean | number | null
// First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.
// Second argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string or optional.
// Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
export type Cursor = <V, K extends string = never>(
	value: V extends CursorValue ? V : ErrorInvalidCursorValue,
	key?: K extends never ? K : IsCharacterValid<K, K, ErrorInvalidFirebaseKey>
) => CursorConstraint<V, K>
