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
	NumericKeyRecord,
	DataSnapshot,
} from './types'
import { createRef } from './refs'
import { initializeApp as initializeApp_ } from 'firebase/app'
import pick from 'pick-random'
import { v4 } from 'uuid'
import betwin from 'betwin'
import { get } from './operations'

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
			| {
					e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
					f: { j: number }
					k: string | Removable
			  }
			| Removable
		h: Record<
			string,
			{
				i: boolean
				l: ServerTimestamp | Removable
				m:
					| PushAble<{ n: '1' | '2' | '7' | '8' | '9' | Removable } | Removable>
					| Removable
				p:
					| PushAbleOnly<{ r: ServerTimestamp | Removable } | Removable>
					| Removable
				s: NumericKeyRecord<{ t: number | Removable } | Removable> | Removable
			}
		>
	}
	o: PushAble<number | Removable>
	q: PushAbleOnly<0 | 1 | 4 | 5 | 6>
	u: NumericKeyRecord<string | Removable>
	w: NumericKeyRecord<{ v: boolean }>
}>

export const usersRef = createRef<Users>()

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
					e: pick(['abc', 'xyz', 'efg', 'lmn', 'rst'] as const)[0]!,
					f: { j: Math.random() },
					k,
				},
				h: {
					[randStringHKey]: {
						i: pick([true, false])[0]!,
						// no point testing server timestamp
						l: 'fake ServerTimestamp' as unknown as ServerTimestamp,
						m: {
							[randStringMKey]: {
								n: pick(['1', '2', '7', '8', '9'] as const)[0]!,
							},
						},
						p: {
							[randStringPKey]: {
								// no point testing server timestamp
								r: 'fake ServerTimestamp' as unknown as ServerTimestamp,
							},
						},
						s: {
							0: {
								t: Math.random(),
							},
						},
					},
				},
			},
			o: { [randStringOKey]: Math.random() },
			q: { [randStringQKey]: pick([0, 1, 4, 5, 6] as const)[0]! },
			u: { 0: u },
			w: { 0: { v: pick([true, false])[0]! } },
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

export const readAndExpectForSet = async <
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

export const compareListeners = <
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

export const readAndExpectForUpdate = async <
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

export const dataForQuery = (): Users['write'] => {
	return {
		a: pick([1, 2, 3] as const)[0]!,
		b: {
			c: true,
			d: {
				e: pick(['abc', 'xyz', 'efg'] as const)[0]!,
				f: { j: 123.45 },
				k: 'abc',
			},
			h: {
				abc: {
					i: pick([true, false])[0]!,
					l: 12345 as unknown as ServerTimestamp,
					m: {
						z: { n: '9' },
						b: { n: '7' },
						x: { n: '1' },
						c: { n: '2' },
						q: { n: '8' },
					},
					p: {
						g: { r: 3426 as unknown as ServerTimestamp },
						i: { r: 6354 as unknown as ServerTimestamp },
						b: { r: 8938 as unknown as ServerTimestamp },
						v: { r: 9023 as unknown as ServerTimestamp },
						c: { r: 3721 as unknown as ServerTimestamp },
					},
					s: {
						91: { t: 7327 },
						82: { t: 6364 },
						73: { t: 2649 },
						64: { t: 3297 },
						55: { t: 1390 },
					},
				},
			},
		},
		o: { v: 5, w: 4, x: 3, y: 2, z: 1 },
		q: { d: 5, y: 4, b: 6, m: 0, p: 1 },
		u: { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 5: 'e' },
		w: {
			6: { v: true },
			3: { v: false },
			7: { v: true },
			1: { v: false },
			0: { v: true },
			5: { v: false },
		},
	}
}
