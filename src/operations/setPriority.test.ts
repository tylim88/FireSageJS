import { setPriority } from './setPriority'
import { usersCreator, initializeApp } from '../utilForTests'

initializeApp()
const ref = usersCreator().ref
// functionality test is with on child move
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
	it('pass type', () => {
		;() => {
			setPriority(ref(`b/h/abc`), 1)
			setPriority(ref(`b/h/abc/m/efg`), 1)
			setPriority(ref(`b/h/abc/p/efg`), 1)
			setPriority(ref(`b/h/abc/s/0`), 1)
			setPriority(ref('o/abc'), 1)
			setPriority(ref('q/abc'), 1)
			setPriority(ref('u/123'), 1)
			setPriority(ref('w/123'), 1)
		}
	})
})
