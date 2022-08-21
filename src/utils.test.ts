import { isDatabase, isOptions } from './utils'

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
})
