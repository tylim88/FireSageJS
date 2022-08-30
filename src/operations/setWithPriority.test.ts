import { setWithPriority } from './setWithPriority'
import { usersRef, initializeApp } from '../utilForTests'
import { serverTimestamp } from '../fieldValue'
import { setPriority } from './setPriority'

initializeApp()

describe('test set priority type', () => {
	it('fail type', () => {
		;() => {
			setWithPriority(
				// @ts-expect-error
				usersRef('a'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				usersRef('b'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				usersRef('b/c'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				usersRef('b/d'),
				'placeholder data',
				1
			)
		}
		;() => {
			setWithPriority(
				// @ts-expect-error
				usersRef('b/h'),
				'placeholder data',
				1
			)
		}
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/i'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/l'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/m'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/p'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/l'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/m'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/p'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('b/h/abc/s'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('o'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('q'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('u'),
			'placeholder data',
			1
		)
		setWithPriority(
			// @ts-expect-error
			usersRef('w'),
			'placeholder data',
			1
		)
	})
	it('pass type and functionality', async () => {
		const p = setWithPriority(
			usersRef(`b/h/abc`),
			{ i: true, l: serverTimestamp(), m: {}, p: {}, s: {} },
			1
		)
		const p2 = setWithPriority(usersRef(`b/h/abc/m/efg`), { n: '7' }, 1)
		const p3 = setWithPriority(
			usersRef(`b/h/abc/p/efg`),
			{ r: serverTimestamp() },
			1
		)
		const p4 = setWithPriority(usersRef(`b/h/abc/s/0`), { t: 123 }, 1)
		const p5 = setWithPriority(usersRef('o/abc'), 123, 1)
		const p6 = setWithPriority(usersRef('q/abc'), 4, 1)
		const p7 = setWithPriority(usersRef('u/123'), 'placeholder data', 1)
		const p8 = setWithPriority(usersRef('w/123'), { v: false }, 1)
		await Promise.all([p, p2, p3, p4, p5, p6, p7, p8])
		const k = setPriority(usersRef(`b/h/abc`), 9)
		const k2 = setPriority(usersRef(`b/h/abc/m/efg`), 9)
		const k3 = setPriority(usersRef(`b/h/abc/p/efg`), 9)
		const k4 = setPriority(usersRef(`b/h/abc/s/0`), 9)
		const k5 = setPriority(usersRef('o/abc'), 9)
		const k6 = setPriority(usersRef('q/abc'), 9)
		const k7 = setPriority(usersRef('u/123'), 9)
		const k8 = setPriority(usersRef('w/123'), 9)
		await Promise.all([k, k2, k3, k4, k5, k6, k7, k8])
	})
})
