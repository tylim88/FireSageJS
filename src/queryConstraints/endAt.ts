import { endAt as endAt_ } from 'firebase/database'
import { MetaType, EndAt } from '../types'

export const endAt = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
>(
	value: V
) => {
	return { type: 'endAt', ref: endAt_(value as any) } as EndAt<T, U, V>
}
