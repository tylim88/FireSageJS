import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'
import { startAt } from './startAt'

initializeApp()
const ref = usersCreator().ref

describe('test orderByChild', () => {
	it('test type, pass', () => {
		// query(ref('b/h'), orderByChild('p'), startAt(123))
	})
})
