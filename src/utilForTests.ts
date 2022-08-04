import {
	MetaType,
	MetaTypeCreator,
	DatabaseReference,
	FindAllChildKeys,
	ErrorHasNoChild,
	FindNestedType,
	RemoveLastSlash,
	ServerTimestamp,
} from './types'
import { serverTimestamp } from './fieldValue'
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
		h: Record<string, { i: boolean; l: ServerTimestamp }>
	}
}>

export const usersCreator = getFiresage<Users>()

export const generateRandomData = (): {
	data: Users['write']
	randString: string
	k: string
} => {
	const randString = pick(['A', ...betwin('A', 'Z'), 'Z'])[0]!
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
				// no point testing server timestamp
				// @ts-expect-error
				h: {
					[randString]: { i: pick([true, false])[0]! },
				},
			},
		},
		randString,
		k,
	}
}

export const readAndExpectSet = async <
	S extends DatabaseReference<MetaType, any>,
	T extends S extends DatabaseReference<infer I, infer Z>
		? { type: I; path: Z }
		: never
>(
	ref: S,
	path: T['path'],
	inputData: T['type']['write']
) => {
	const snapshot = await get(ref)
	const data = snapshot.val()
	// @ts-expect-error
	const arr = path?.split('/') || []
	// @ts-expect-error
	const narrowedInputData = arr.reduce((acc, item) => {
		return acc[item]
	}, inputData)

	expect(data).toEqual(narrowedInputData)

	return snapshot
}

export const readAndExpectUpdate = async <
	S extends DatabaseReference<MetaType, any>,
	T extends S extends DatabaseReference<infer I, infer Z>
		? { type: I; path: Z }
		: never,
	U extends FindAllChildKeys<T['type'], T['path']> extends never
		? ErrorHasNoChild<T['path']>
		: FindAllChildKeys<T['type'], T['path']>
>(
	inputData: FindNestedType<
		T['type'],
		T['path'] extends undefined
			? RemoveLastSlash<U>
			: `${T['path']}/${RemoveLastSlash<U>}`,
		'write'
	>,
	ref: S,
	path: U extends never
		? U
		: string extends FindAllChildKeys<T['type'], T['path']>
		? `${string}/` // some child key type is string and require differentiation
		: U
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
