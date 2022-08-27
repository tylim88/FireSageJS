import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'
import { startAt } from './startAt'

initializeApp()
const ref = usersCreator().ref

describe('test orderByChild', () => {
	it('test type, fail', () => {
		;() => {
			query(
				ref('b/h'),
				orderByChild('p'),
				// @ts-expect-error
				startAt({ 1: { r: 1 } })
			)
			query(
				ref('b/h'),
				orderByChild('p'),
				// @ts-expect-error
				startAt(123)
			)
		}
	})
})
