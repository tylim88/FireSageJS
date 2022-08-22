import { setWithPriority } from './setWithPriority'
import { usersCreator, initializeApp } from '../utilForTests'
import { serverTimestamp } from '../fieldValue'

initializeApp()
const ref = usersCreator().ref
describe('test set priority type', () => {
	it('fail type', () => {
		;() => {
			setWithPriority(
				// @ts-expect-error
				ref('a'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				ref('b'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				ref('b/c'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				ref('b/d'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				ref('b/h'),
				'placeholder data',
				1
			)
		}
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/i'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/l'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/m'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/p'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/l'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/m'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/p'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('b/h/abc/s'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('o'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('q'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('u'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			ref('w'),
			'placeholder data',
			1
		)
	})
	it('pass type and functionality', () => {
		setWithPriority(
			ref(`b/h/abc`),
			{ i: true, l: serverTimestamp(), m: {}, p: {}, s: {} },
			1
		)
		setWithPriority(ref(`b/h/abc/m/efg`), { n: '7' }, 1)
		setWithPriority(ref(`b/h/abc/p/efg`), { r: serverTimestamp() }, 1)
		setWithPriority(ref(`b/h/abc/s/0`), { t: 123 }, 1)
		setWithPriority(ref('o/abc'), 123, 1)
		setWithPriority(ref('q/abc'), 4, 1)
		setWithPriority(ref('u/123'), 'placeholder data', 1)
		setWithPriority(ref('w/123'), { v: false }, 1)
	})
})
