import { OriDataSnapshot } from './types'

export const createObjectFromKeysAndValues = (
	keys: string[],
	values: unknown[]
) => {
	const obj: Record<string, unknown> = {}

	keys.forEach((item, index) => {
		obj[item] = values[index]
	})

	return obj
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

export const dataSnapshotTransformer = (dataSnapshot: OriDataSnapshot) => {
	return {
		ref: dataSnapshot.ref,
		key: dataSnapshot.key,
		size: dataSnapshot.size,
		child: (path: string) => dataSnapshotTransformer(dataSnapshot.child(path)),
		exists: () => dataSnapshot.exists(),
		forEach: (
			action: (
				dataSnapshot: OriDataSnapshot & { key: string },
				index: number
			) => boolean | void
			// ! ts expect error not working properly here, use unknown instead, invisible error
		): unknown => {
			let i = 0
			return dataSnapshot.forEach(dataSnapshot => {
				return action(
					// @ts-expect-error
					dataSnapshotTransformer(dataSnapshot),
					i++
				)
			})
		},
		hasChild: (path: string) => dataSnapshot.hasChild(path),
		hasChildren: () => dataSnapshot.hasChildren(),
		toJSON: (): unknown => dataSnapshot.toJSON(), // ! ts expect error not working properly here, use unknown instead, invisible error
		val: () => startRecurseObjectAndConvertArrayToObject(dataSnapshot.val()),
	}
}
