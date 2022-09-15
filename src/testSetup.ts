import { usersRefCreator, initializeApp } from './utilForTests'
import { set } from './operations'
import 'dotenv/config'

export default async () => {
	initializeApp()
	const usersRef = usersRefCreator()
	return set(
		usersRef(),
		// @ts-expect-error
		null
	)
}
