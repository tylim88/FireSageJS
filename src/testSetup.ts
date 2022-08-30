import { usersRef, initializeApp } from './utilForTests'
import { set } from './operations'
import 'dotenv/config'

export default async () => {
	initializeApp()
	return set(
		usersRef(),
		// @ts-expect-error
		null
	)
}
