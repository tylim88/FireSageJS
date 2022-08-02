import { MetaType, MetaTypeCreator, DatabaseReference } from './types'
import { getFiresage } from '.'
import { initializeApp as initializeApp_ } from 'firebase/app'
import pick from 'pick-random'
import { v4 } from 'uuid'
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
		d: { e: 'abc'; f: { j: number }; k: string }
		h: Record<string, { i: boolean }>
	}
}>

export const usersCreator = getFiresage<Users>()

export const generateRandomData = (): {
	data: Users['root']
	randString: string
} => {
	const v4_ = v4()
	return {
		data: {
			a: pick([1, 2, 3] as const)[0]!,
			b: {
				c: true,
				d: {
					e: 'abc',
					f: { j: Math.random() },
					k: v4(),
				},
				h: { [v4_]: { i: pick([true, false])[0]! } },
			},
		},
		randString: v4_,
	}
}

export const readAndExpect = async <
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | undefined
>(
	inputData: T['root'],
	ref: DatabaseReference<T, U>,
	path: U
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
