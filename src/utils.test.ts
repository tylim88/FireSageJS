import { isDatabase, isOptions, convertNumericKeyObjectToArray } from './utils'

describe('test isFirestore', () => {
	it('positive test', () => {
		expect(isDatabase({})).toBe(false)
		expect(isDatabase({ type: 'datazbase' })).toBe(false)
		expect(isDatabase({ type: 'database' })).toBe(true)
		expect(isDatabase({ useEmulator: {} })).toBe(true)
		expect(isDatabase({ useEmulator: undefined })).toBe(false)
	})
	it('test isOption', () => {
		expect(isOptions({})).toBe(false)
		expect(isOptions({ onlyOnce: false })).toBe(true)
		expect(isOptions({ onlyOnce: true })).toBe(true)
	})
	it('test convertNumericKeyObjectToArray', () => {
		expect(convertNumericKeyObjectToArray(123)).toBe(123)
		expect(convertNumericKeyObjectToArray(true)).toBe(true)
		expect(convertNumericKeyObjectToArray(null)).toBe(null)
		const func = () => {
			//
		}
		expect(convertNumericKeyObjectToArray(func)).toBe(func)
		const obj = { a: 1, b: 2, c: '3' }
		const obj2 = { a: 1, b: 2, 3: 'c' }
		expect(convertNumericKeyObjectToArray(obj)).toBe(obj)
		expect(convertNumericKeyObjectToArray(obj2)).toBe(obj2)
		const a = []
		a[0] = 'z'
		a[3] = 'b'
		a[100] = 'z'
		expect(
			convertNumericKeyObjectToArray({ 0: 'z', 3: 'b', 100: 'z' })
		).toEqual(a)
	})
})
