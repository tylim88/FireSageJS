import { MetaTypeCreator } from './types'

export type Users = MetaTypeCreator<
	{
		a: 1
		b: { c: true; d: { e: 'abc'; f: { g: null } } }
	},
	'Users'
>
