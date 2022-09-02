import { update as update_ } from 'firebase/database'
import { Update } from '../types'

export const update: Update = (ref, paths, values) => {
	const obj: Record<string, unknown> = {}

	paths.forEach((item, index) => {
		obj[item] = values[index]
	})

	return update_(ref, obj)
}
