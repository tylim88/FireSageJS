import { query } from '../refs'
import { usersCreator, initializeApp } from '../utilForTests'
import { orderByChild } from './orderByChild'

initializeApp()
const ref = usersCreator().ref

describe('test orderByChild', () => {
	it('test type, pass', () => {
		query(ref('b/h'), orderByChild('p'))
	})
})
