import { ErrorInvalidFirebaseKey, ErrorInvalidCursorValue } from './error'
import { CursorConstraint, CursorTypes } from './queryConstraint'
import { IsCharacterValid } from '../utils'

export type CursorValue = string | boolean | number | null
// First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.
// Second argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string or optional.
// Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
export type Cursor<T extends CursorTypes> = <V, K extends string = never>(
	value: V extends CursorValue ? V : ErrorInvalidCursorValue,
	key?: K extends never ? K : IsCharacterValid<K, K, ErrorInvalidFirebaseKey>
) => CursorConstraint<T, V, K>

export type EndAt = Cursor<'endAt'>

export type EndBefore = Cursor<'endBefore'>

export type StartAt = Cursor<'startAt'>

export type StartAfter = Cursor<'startAfter'>

export type EqualTo = Cursor<'equalTo'>
