import { isListenOptions } from './utils'

describe('test utils', () => {
	it('test isOption', () => {
		expect(isListenOptions({})).toBe(false)
		expect(isListenOptions({ onlyOnce: false })).toBe(true)
		expect(isListenOptions({ onlyOnce: true })).toBe(true)
	})
})
