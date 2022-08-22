import {
	MetaType,
	MetaTypeCreator,
	DatabaseReference,
	FindAllLevelChildKeys,
	ErrorHasNoChild,
	FindNestedWriteTypeFromFullPath,
	RemoveLastSlash,
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	PseudoArray,
	DataSnapshot,
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
		d:
			| { e: 'abc' | 'xyz' | 'efg'; f: { j: number }; k: string | Removable }
			| Removable
		h: Record<
			string,
			{
				i: boolean
				l: ServerTimestamp | Removable
				m: PushAble<{ n: '7' | '8' | '9' | Removable } | Removable> | Removable
				p:
					| PushAbleOnly<{ r: ServerTimestamp | Removable } | Removable>
					| Removable
				s: PseudoArray<{ t: number | Removable } | Removable> | Removable
			}
		>
	}
	o: PushAble<number | Removable>
	q: PushAbleOnly<4 | 5 | 6>
	u: PseudoArray<string | Removable>
	w: PseudoArray<{ v: boolean }>
}>

export const usersCreator = getFiresage<Users>()

const getRandomCapitalAlphabet = () => pick(['A', ...betwin('A', 'Z'), 'Z'])[0]!

export const generateRandomData = (): {
	data: Users['write']
	k: string
	u: string
	randStringHKey: string
	randStringOKey: string
	randStringPKey: string
	randStringMKey: string
	randStringQKey: string
} => {
	const randStringHKey = getRandomCapitalAlphabet()
	const randStringMKey = getRandomCapitalAlphabet()
	const randStringOKey = getRandomCapitalAlphabet()
	const randStringPKey = getRandomCapitalAlphabet()
	const randStringQKey = getRandomCapitalAlphabet()
	const k = v4()
	const u = v4()
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
						p: {
							[randStringPKey]: {
								// no point testing server timestamp
								r: 'fake ServerTimestamp' as unknown as ServerTimestamp,
							},
						},
						s: [
							{
								t: Math.random(),
							},
						],
					},
				},
			},
			o: { [randStringOKey]: Math.random() },
			q: { [randStringQKey]: pick([4, 5, 6] as const)[0]! },
			u: [u],
			w: [{ v: pick([true, false])[0]! }],
		},
		randStringHKey,
		randStringOKey,
		randStringPKey,
		randStringMKey,
		randStringQKey,
		k,
		u,
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

const getNarrowedDataFromPath = (
	path: string | undefined,
	fullData: unknown
) => {
	const arr = path?.split('/') || []
	arr[arr.length - 1] === '' && arr.splice(-1, 1)
	return arr.reduce((acc, item) => {
		// @ts-expect-error
		return acc[item]
	}, fullData)
}

export const compareOnValue = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	path: U,
	snapshot: DataSnapshot<T, U>,
	inputData: FindNestedWriteTypeFromFullPath<T, undefined>
) => {
	const outputData = snapshot.val()
	expect(getNarrowedDataFromPath(path, inputData)).toEqual(outputData)
}

export const readAndExpectUpdate = async <
	S extends DatabaseReference<any, any>,
	T extends S extends DatabaseReference<infer X, any> ? X : never,
	U extends S extends DatabaseReference<any, infer X> ? X : never,
	V extends FindAllLevelChildKeys<T, U> extends never
		? ErrorHasNoChild<U>
		: FindAllLevelChildKeys<T, U>
>(
	ref: S,
	path: V extends never
		? V
		: string extends FindAllLevelChildKeys<T, U>
		? `${string}/` // some child key type is string and require differentiation
		: V,
	inputData: FindNestedWriteTypeFromFullPath<
		T,
		U extends undefined ? RemoveLastSlash<V> : `${U}/${RemoveLastSlash<V>}`
	>
) => {
	const snapshot = await get(ref)
	const outputData = snapshot.val()
	expect(getNarrowedDataFromPath(path, outputData)).toEqual(inputData)

	return snapshot
}
