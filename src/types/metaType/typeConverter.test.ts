import { Users } from '../../utilForTests'
import { MetaTypeCreator } from './creator'
import { IsTrue, IsSame } from '../tsUtils'

// the rest are tested in creator.test.ts
describe('test type converter', () => {
	it('test read all node as undefined', () => {
		type A = MetaTypeCreator<
			Users['base'],
			{ AllNodesPossiblyReadAsUndefined: true }
		>['read']

		IsTrue<
			IsSame<
				A,
				| {
						a: 1 | 2 | 3 | undefined
						b:
							| {
									c: true | undefined
									d:
										| {
												e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst' | undefined
												f: { j: number | undefined } | undefined
												k: string | undefined
										  }
										| undefined

									h:
										| Record<
												string,
												| {
														i: boolean | undefined
														l: number | undefined
														m:
															| Record<
																	string,
																	| {
																			n: '1' | '2' | '7' | '8' | '9' | undefined
																	  }
																	| undefined
															  >
															| undefined
														p:
															| Record<
																	string,
																	| {
																			r: number | undefined
																	  }
																	| undefined
															  >
															| undefined
														s:
															| Record<
																	`${number}`,
																	{ t: number | undefined } | undefined
															  >
															| undefined
												  }
												| undefined
										  >
										| undefined
							  }
							| undefined
						o: Record<string, number | undefined> | undefined
						q: Record<string, 0 | 1 | 4 | 5 | 6 | undefined> | undefined
						u: Record<`${number}`, string | undefined> | undefined
						w:
							| Record<`${number}`, { v: boolean | undefined } | undefined>
							| undefined
				  }
				| undefined
			>
		>
	})
})
