import { setPriority } from './setPriority'
import { usersCreator, initializeApp } from '../utilForTests'

initializeApp()
const ref = usersCreator().ref
// functionality test is test with onChildMove and setWithPriority
describe('test set priority type', () => {
	it('fail type', () => {
		;() => {
			setPriority(
				// @ts-expect-error
				ref('a'),
				1
			)
		}
		;() => {
			setPriority(
				// @ts-expect-error
				ref('b'),
				1
			)
		}
		;() => {
			setPriority(
				// @ts-expect-error
				ref('b/c'),
				1
			)
		}
		;() => {
			setPriority(
				// @ts-expect-error
				ref('b/d'),
				1
			)
		}
		;() => {
			setPriority(
				// @ts-expect-error
				ref('b/h'),
				1
			)
		}
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/i'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/l'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/m'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/p'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/l'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/m'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/p'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('b/h/abc/s'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('o'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('q'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('u'),
			1
		)
		setPriority(
			// @ts-expect-error
			ref('w'),
			1
		)
	})
})
