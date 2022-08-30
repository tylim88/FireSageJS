import { OriDataSnapshot } from './types'

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
