import { Users } from '../../utilForTests'
import { MetaTypeCreator } from './creator'
import { IsTrue, IsSame } from '../tsUtils'

// the rest are tested in creator.test.ts
describe('test type converter', () => {
	it('test read all node as undefined|null', () => {
		type A = MetaTypeCreator<
			Users['base'],
			{ AllNodesPossiblyReadAsNullable: true }
		>['read']

		IsTrue<
			IsSame<
				A,
				| {
						a: 1 | 2 | 3 | undefined | null
						b:
							| {
									c: true | undefined | null
									d:
										| {
												e:
													| 'abc'
													| 'xyz'
													| 'efg'
													| 'lmn'
													| 'rst'
													| undefined
													| null
												f: { j: number | undefined | null } | undefined | null
												k: string | undefined | null
										  }
										| undefined
										| null

									h:
										| Record<
												string,
												| {
														i: boolean | undefined | null
														l: number | undefined | null
														m:
															| Record<
																	string,
																	| {
																			n:
																				| '1'
																				| '2'
																				| '7'
																				| '8'
																				| '9'
																				| undefined
																				| null
																	  }
																	| undefined
																	| null
															  >
															| undefined
															| null
														p:
															| Record<
																	string,
																	| {
																			r: number | undefined | null
																	  }
																	| undefined
																	| null
															  >
															| undefined
															| null
														s:
															| Record<
																	`${number}`,
																	| { t: number | undefined | null }
																	| undefined
																	| null
															  >
															| undefined
															| null
												  }
												| undefined
												| null
										  >
										| undefined
										| null
							  }
							| undefined
							| null
						o: Record<string, number | undefined | null> | undefined | null
						q:
							| Record<string, 0 | 1 | 4 | 5 | 6 | undefined | null>
							| undefined
							| null
						u: Record<`${number}`, string | undefined | null> | undefined | null
						w:
							| Record<
									`${number}`,
									{ v: boolean | undefined | null } | undefined | null
							  >
							| undefined
							| null
				  }
				| undefined
				| null
			>
		>
	})
})
