import {
	Database,
	FirestoreTesting,
	ListenOptions,
	DataSnapshot,
} from './types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<Database>
	const e = value as Partial<FirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	const v = value as Partial<Database>
	return typeof v === 'string'
}

export const isOptions = (
	arg: ((error: Error) => unknown) | (() => void) | ListenOptions | undefined
): arg is ListenOptions => {
	const v = arg as Partial<ListenOptions>
	return v?.onlyOnce !== undefined // onlyOnce is boolean, so check for undefined
}

export const convertNumericKeyObjectToArray = (data: unknown): unknown => {
	if (
		typeof data === 'object' &&
		data !== null &&
		Object.getPrototypeOf(data) === Object.prototype
	) {
		// ! '.' is invalid firebase key but key eg 5.0 is valid and will be saved as 5
		// ! still, key like 5.1 is not valid so reading float number key is impossible
		const allNumericKeys = Object.keys(data).map(key => parseInt(key))
		const isAllPositiveIntegerKey = !allNumericKeys.some(key => {
			return !(key >= 0)
		})
		if (isAllPositiveIntegerKey) {
			const arr: unknown[] = []
			const values = Object.values(data)
			allNumericKeys.forEach((key, i) => {
				arr[key] = values[i]
			})
			return arr
		} else {
			return data
		}
	}
	return data
}

export const dataSnapshotTransformer = <T extends DataSnapshot<any, any>>(
	dataSnapshot: T
): T => {
	dataSnapshot.val = () => {
		return convertNumericKeyObjectToArray(dataSnapshot.val())
	}
	dataSnapshot.exportVal = () => {
		return convertNumericKeyObjectToArray(dataSnapshot.exportVal())
	}
	// @ts-expect-error
	dataSnapshot.child = (path: string) => {
		return dataSnapshotTransformer(
			dataSnapshot.child(
				// @ts-expect-error
				path
			)
		)
	}
	return dataSnapshot
}
