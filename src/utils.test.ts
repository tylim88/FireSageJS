import {
	convertArrayToObject,
	startRecurseObjectAndConvertArrayToObject,
} from './utils'

describe('test utils', () => {
	it('test convertArrayToObject', () => {
		expect(convertArrayToObject(123)).toBe(123)
		expect(convertArrayToObject(true)).toBe(true)
		expect(convertArrayToObject(null)).toBe(null)
		const func = () => {
			//
		}
		expect(convertArrayToObject(func)).toBe(func)
		const obj = { a: 1, b: 2, c: '3' }
		const obj2 = { a: 1, b: 2, 3: 'c' }
		expect(convertArrayToObject(obj)).toBe(obj)
		expect(convertArrayToObject(obj2)).toBe(obj2)
		const a = []
		a[0] = 'z'
		a[3] = 'b'
		a[100] = 'z'
		expect(convertArrayToObject(a)).toEqual({ 0: 'z', 3: 'b', 100: 'z' })
	})

	it('test startRecurseObjectAndConvertArrayToObject', () => {
		expect(startRecurseObjectAndConvertArrayToObject(123)).toBe(123)
		expect(startRecurseObjectAndConvertArrayToObject(true)).toBe(true)
		expect(startRecurseObjectAndConvertArrayToObject(null)).toBe(null)
		const func = () => {
			//
		}
		expect(startRecurseObjectAndConvertArrayToObject(func)).toBe(func)
		const obj = { a: 1, b: 2, c: '3' }
		const obj2 = { a: 1, b: 2, 3: 'c' }
		expect(startRecurseObjectAndConvertArrayToObject(obj)).toBe(obj)
		expect(startRecurseObjectAndConvertArrayToObject(obj2)).toBe(obj2)
		const a = []
		a[0] = 'l'
		a[3] = 'b'
		a[10] = 'z'
		expect(startRecurseObjectAndConvertArrayToObject(a)).toEqual({
			0: 'l',
			3: 'b',
			10: 'z',
		})
		expect(startRecurseObjectAndConvertArrayToObject({ b: a, c: 1 })).toEqual({
			b: {
				0: 'l',
				3: 'b',
				10: 'z',
			},
			c: 1,
		})
		expect(
			startRecurseObjectAndConvertArrayToObject({
				b: [...a, { c: [...a, { d: a }] }],
				c: 1,
			})
		).toEqual({
			b: {
				0: 'l',
				3: 'b',
				10: 'z',
				11: {
					c: {
						0: 'l',
						3: 'b',
						10: 'z',
						11: {
							d: {
								0: 'l',
								3: 'b',
								10: 'z',
							},
						},
					},
				},
			},
			c: 1,
		})
	})
})
