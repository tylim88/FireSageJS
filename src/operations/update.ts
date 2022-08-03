import { update as update_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	PartialButNoUndefinedAndNoUnknown,
} from '../types'

export const update = <
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | undefined,
	V extends Record<string, unknown>
>(
	ref: DatabaseReference<T, U>,
	value: V extends never ? V : PartialButNoUndefinedAndNoUnknown<T, U, V>
) => {
	// @ts-expect-error
	return update_(ref, value)
}
