import { setPriority } from './setPriority'
import { usersRefCreator, initializeApp } from '../utilForTests'

initializeApp()
const usersRef = usersRefCreator()

// functionality test is test with onChildMove and setWithPriority
describe('test set priority type', () => {
	it('fail type', () => {
		;() => {
			setPriority(
				// @ts-expect-error
				usersRef('a'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/c'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/d'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/i'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/l'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/m'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/p'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/l'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/m'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/p'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('b/h/abc/s'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('o'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('q'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('u'),
				1
			)
			setPriority(
				// @ts-expect-error
				usersRef('w'),
				1
			)
		}
	})
})
