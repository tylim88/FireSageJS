import { limitToFirst, limitToLast } from './limit'

// functionality test in get.test.ts
describe('test limit type', () => {
	it('test wide number type, should pass', () => {
		;() => {
			const num = 1 as number
			limitToFirst(num)
			limitToLast(num)
		}
	})
	it('test positive number type, should pass', () => {
		;() => {
			const num = 1 as const
			limitToFirst(num)
			limitToLast(num)
		}
	})
	it('test negative number type, should fail', () => {
		;() => {
			// @ts-expect-error
			limitToFirst(-1)
			// @ts-expect-error
			limitToLast(-1)
		}
	})
	it('test 0 literal type, should fail', () => {
		;() => {
			// @ts-expect-error
			limitToFirst(0)
			// @ts-expect-error
			limitToLast(0)
		}
	})
	it('test decimal literal type, should fail', () => {
		;() => {
			// @ts-expect-error
			limitToFirst(0.111)
			// @ts-expect-error
			limitToLast(0.111)
		}
	})
	it('test negative decimal literal type, should fail', () => {
		;() => {
			// @ts-expect-error
			limitToFirst(-9.875)
			// @ts-expect-error
			limitToLast(-9.875)
		}
	})
})
