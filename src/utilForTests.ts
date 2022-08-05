import {
	MetaType,
	MetaTypeCreator,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
	FindNestedType,
	RemoveLastSlash,
	ServerTimestamp,
	Push,
} from './types'
import { getFiresage } from '.'
import { initializeApp as initializeApp_ } from 'firebase/app'
import pick from 'pick-random'
import { v4 } from 'uuid'
import { get } from './operations'
import betwin from 'betwin'

export const initializeApp = () => {
	const env = process.env
	const config = {
		projectId: env.PROJECT_ID!,
	}
	return initializeApp_(config)
}

export type Users = MetaTypeCreator<{
	a: 1 | 2 | 3
	b: {
		c: true
		d: { e: 'abc' | 'xyz' | 'efg'; f: { j: number }; k: string }
		h: Record<
			string,
			{ i: boolean; l: ServerTimestamp; m: Push<{ n: '7' | '8' | '9' }> }
		>
	}
}>

export const usersCreator = getFiresage<Users>()

export const generateRandomData = (): {
	data: Users['write']
	k: string
	randStringHKey: string
	randStringMKey: string
} => {
	const randStringHKey = pick(['A', ...betwin('A', 'Z'), 'Z'])[0]!
	const randStringMKey = pick(['A', ...betwin('A', 'Z'), 'Z'])[0]!
	const k = v4()
	return {
		data: {
			a: pick([1, 2, 3] as const)[0]!,
			b: {
				c: true,
				d: {
					e: pick(['abc', 'xyz', 'efg'] as const)[0]!,
					f: { j: Math.random() },
					k,
				},
				h: {
					[randStringHKey]: {
						i: pick([true, false])[0]!,
						// no point testing server timestamp
						l: 'fake ServerTimestamp' as unknown as ServerTimestamp,
						m: { [randStringMKey]: { n: pick(['7', '8', '9'] as const)[0]! } },
					},
				},
			},
		},
		randStringMKey,
		randStringHKey,
		k,
	}
}

export const readAndExpectSet = async <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: DatabaseReference<T, U>,
	path: U,
	inputData: T['write']
) => {
	const snapshot = await get(ref)
	const data = snapshot.val()
	const arr = path?.split('/') || []
	const narrowedInputData = arr.reduce((acc, item) => {
		// @ts-expect-error
		return acc[item]
	}, inputData)

	expect(data).toEqual(narrowedInputData)

	return snapshot
}

export const readAndExpectUpdate = async <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends FindAllChildKeys<T, U> extends never
		? ErrorHasNoChild<U>
		: FindAllChildKeys<T, U>
>(
	ref: DatabaseReference<T, U>,
	path: V extends never
		? V
		: string extends FindAllChildKeys<T, U>
		? `${string}/` // some child key type is string and require differentiation
		: V,
	inputData: FindNestedType<
		T,
		U extends undefined ? RemoveLastSlash<V> : `${U}/${RemoveLastSlash<V>}`,
		'write'
	>
) => {
	const snapshot = await get(ref)
	const outputData = snapshot.val()
	const arr = path?.split('/') || []
	arr[arr.length - 1] === '' && arr.splice(-1, 1)
	const narrowedOutputData = arr.reduce((acc, item) => {
		// @ts-expect-error
		return acc[item]
	}, outputData)
	expect(narrowedOutputData).toEqual(inputData)

	return snapshot
}
