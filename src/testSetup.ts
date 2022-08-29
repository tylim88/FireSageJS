import { usersCreator, initializeApp } from './utilForTests'
import { set } from './operations'
import 'dotenv/config'

export default async () => {
	initializeApp()
	return set(
		usersCreator().ref(),
		// @ts-expect-error
		null
	)
}
