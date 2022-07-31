import { MetaTypeCreator } from './types'
import { getFiresage } from '.'
import { initializeApp as initializeApp_ } from 'firebase/app'

export const initializeApp = () => {
	const env = process.env
	const config = {
		projectId: env.PROJECT_ID,
	}
	return initializeApp_(config)
}

export type Users = MetaTypeCreator<
	{
		a: 1
		b: { c: true; d: { e: 'abc'; f: { g: null } }; h: Record<string, boolean> }
	},
	'Users'
>

export const usersCreator = getFiresage<Users>()
