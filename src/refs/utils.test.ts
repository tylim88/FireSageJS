import { isDatabase } from './utils'

describe('test utils', () => {
	it('test isDatabase', () => {
		expect(isDatabase({})).toBe(false)
		expect(isDatabase({ type: 'datazbase' })).toBe(false)
		expect(isDatabase({ type: 'database' })).toBe(true)
		expect(isDatabase({ useEmulator: {} })).toBe(true)
		expect(isDatabase({ useEmulator: undefined })).toBe(false)
	})
})
