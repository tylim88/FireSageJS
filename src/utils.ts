import { Database, FirestoreTesting, OriDataSnapshot } from './types'

export const isDatabase = (value: unknown): value is Database => {
	const v = value as Partial<Database>
	const e = value as Partial<FirestoreTesting>
	return v?.type === 'database' || !!e?.useEmulator
}

export const isString = (value: unknown): value is string => {
	const v = value as Partial<Database>
	return typeof v === 'string'
}

// not in use
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
	} else {
		return data
	}
}

export const convertArrayToObject = (data: unknown): unknown => {
	if (Array.isArray(data)) {
		return { ...data }
	} else {
		return data
	}
}

export const recurseObjectAndConvertArrayToObject = (
	data: unknown,
	obj?: Record<string, unknown>,
	key?: string
) => {
	if (
		typeof data === 'object' &&
		data !== null &&
		Object.getPrototypeOf(data) === Object.prototype
	) {
		for (const k in data) {
			const value =
				// @ts-expect-error
				data[k]
			recurseObjectAndConvertArrayToObject(
				value,
				// @ts-expect-error
				data,
				k
			)
		}
	} else if (key && obj) {
		const converted = convertArrayToObject(data)
		recurseObjectAndConvertArrayToObject(converted)
		obj[key] = converted
	}
}

export const startRecurseObjectAndConvertArrayToObject = (data: unknown) => {
	recurseObjectAndConvertArrayToObject(data)
	return convertArrayToObject(data)
}

export const dataSnapshotTransformer = (
	dataSnapshot: OriDataSnapshot
): OriDataSnapshot => {
	return {
		ref: dataSnapshot.ref,
		priority: dataSnapshot.priority,
		key: dataSnapshot.key,
		size: dataSnapshot.size,
		child: (path: string) => dataSnapshotTransformer(dataSnapshot.child(path)),
		exists: () => dataSnapshot.exists(),
		exportVal: () =>
			startRecurseObjectAndConvertArrayToObject(dataSnapshot.exportVal()),
		forEach: (
			action: (
				dataSnapshot: OriDataSnapshot & { key: string }
			) => boolean | void
		) => {
			return dataSnapshot.forEach(dataSnapshot =>
				action(
					// @ts-expect-error
					dataSnapshotTransformer(dataSnapshot)
				)
			)
		},
		hasChild: (path: string) => dataSnapshot.hasChild(path),
		hasChildren: () => dataSnapshot.hasChildren(),
		toJSON: () => dataSnapshotTransformer(dataSnapshot).toJSON(),
		val: () => startRecurseObjectAndConvertArrayToObject(dataSnapshot.val()),
	}
}
