import { Users } from '../../utilForTests'
import { MetaTypeCreator } from './creator'
import { IsTrue, IsSame } from '../utils'

describe('test read all node as null', () => {
	it('test', () => {
		type A = MetaTypeCreator<
			Users['base'],
			{ AllNodesPossiblyReadAsUndefined: true }
		>['read']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3 | null
					b: {
						c: true | null
						d: {
							e: 'abc' | 'xyz' | 'efg' | null
							f: { j: number | null } | null
							k: string | null
						} | null
						h: Record<
							string,
							{
								i: boolean | null
								l: number | null
								m: Record<string, { n: '7' | '8' | '9' | null } | null> | null
							} | null
						> | null
					} | null
					o: Record<string, number | null> | null
				} | null
			>
		>
	})
})
