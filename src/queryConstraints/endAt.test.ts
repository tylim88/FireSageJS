import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'
import { endAt } from './endAt'

initializeApp()
const ref = usersCreator().ref

describe('test orderByChild', () => {
	it('test type, pass', () => {
		query(ref('b/h'), endAt(1))
	})
})
