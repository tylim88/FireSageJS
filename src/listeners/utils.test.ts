import { isOptions } from './utils'

describe('test utils', () => {
	it('test isOption', () => {
		expect(isOptions({})).toBe(false)
		expect(isOptions({ onlyOnce: false })).toBe(true)
		expect(isOptions({ onlyOnce: true })).toBe(true)
	})
})
