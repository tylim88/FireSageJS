import { update as update_ } from 'firebase/database'
import {
	DatabaseReference,
	MetaType,
	FindAllChildKeys,
	VerifyNodeNames,
	GetNodeTypes,
} from '../types'

// TODO research the 2 dimensions tuple inference issue, check old commit
export const update = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	N
>(
	ref: DatabaseReference<T, U>,
	nodeNames: N extends never ? N : VerifyNodeNames<T, U, N>,
	nodeTypes: GetNodeTypes<T, U, N>
) => {
	const obj: Record<string, unknown> = {}

	nodeNames.forEach(item => {
		obj[item] = nodeTypes
	})

	return update_(ref as any, obj)
}
