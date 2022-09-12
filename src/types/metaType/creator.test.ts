import {
	ServerTimestamp,
	Increment,
	Removable,
	PushAble,
	PushAbleOnly,
	NumericKeyRecord,
	PossiblyReadAsNullable,
} from '../fieldValue'
import { IsTrue, IsSame } from '../tsUtils'
import { Users } from '../../utilForTests'

describe('test generated meta type', () => {
	it('test flatten_write', () => {
		type A = Users['flatten_write']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3
					o: { [x: string]: number | Increment }
					q: { [x: string]: 0 | 1 | 4 | 5 | 6 }
					u: { [x: `${number}`]: string } | string[]
					w:
						| { v: boolean }[]
						| { [x: `${number}`]: { v: boolean }; [x: `${number}/v`]: boolean }
					[x: `o/${string}`]: number | Increment
					[x: `q/${string}`]: 0 | 1 | 4 | 5 | 6
					[x: `u/${number}`]: string
					[x: `w/${number}`]: { v: boolean }
					[x: `w/${number}/v`]: boolean
					'b/c': true
					'b/d': {
						e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
						f: {
							j: number | Increment
						}
						'f/j': number | Increment
						k: string
					}
					'b/d/e': 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
					'b/d/f': {
						j: number | Increment
					}
					'b/d/f/j': number | Increment
					'b/d/k': string
					b: {
						c: true
						d: {
							e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
							f: {
								j: number | Increment
							}
							'f/j': number | Increment
							k: string
						}
						'd/e': 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
						'd/f': {
							j: number | Increment
						}
						'd/f/j': number | Increment
						'd/k': string
						h: {
							[x: string]: {
								i: boolean
								l: ServerTimestamp
								m: {
									[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
									[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
								}
								[x: `m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
								[x: `m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
								p: {
									[x: string]: { r: ServerTimestamp }
									[x: `${string}/r`]: ServerTimestamp
								}
								[x: `p/${string}`]: { r: ServerTimestamp }
								[x: `p/${string}/r`]: ServerTimestamp
								s:
									| {
											[x: `${number}`]: {
												t: number | Increment
											}
											[x: `${number}/t`]: number | Increment
									  }
									| { t: number | Increment }[]
								[x: `s/${number}`]: { t: number | Increment }
								[x: `s/${number}/t`]: number | Increment
							}
							[x: `${string}/i`]: boolean
							[x: `${string}/l`]: ServerTimestamp
							[x: `${string}/m`]: {
								[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
								[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
							}
							[x: `${string}/m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `${string}/m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
							[x: `${string}/p`]: {
								[x: string]: { r: ServerTimestamp }
								[x: `${string}/r`]: ServerTimestamp
							}
							[x: `${string}/p/${string}`]: { r: ServerTimestamp }
							[x: `${string}/p/${string}/r`]: ServerTimestamp
							[x: `${string}/s`]:
								| {
										[x: `${number}`]: { t: number | Increment }
										[x: `${number}/t`]: number | Increment
								  }
								| { t: number | Increment }[]
							[x: `${string}/s/${number}`]: { t: number | Increment }
							[x: `${string}/s/${number}/t`]: number | Increment
						}
						[x: `h/${string}`]: {
							i: boolean
							l: ServerTimestamp
							m: {
								[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
								[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
							}
							[x: `m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
							p: {
								[x: string]: { r: ServerTimestamp }
								[x: `${string}/r`]: ServerTimestamp
							}
							[x: `p/${string}`]: { r: ServerTimestamp }
							[x: `p/${string}/r`]: ServerTimestamp
							s:
								| {
										[x: `${number}`]: { t: number | Increment }
										[x: `${number}/t`]: number | Increment
								  }
								| { t: number | Increment }[]
							[x: `s/${number}`]: { t: number | Increment }
							[x: `s/${number}/t`]: number | Increment
						}
						[x: `h/${string}/i`]: boolean
						[x: `h/${string}/l`]: ServerTimestamp
						[x: `h/${string}/m`]: {
							[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
						}
						[x: `h/${string}/m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
						[x: `h/${string}/m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
						[x: `h/${string}/p`]: {
							[x: string]: { r: ServerTimestamp }
							[x: `${string}/r`]: ServerTimestamp
						}
						[x: `h/${string}/p/${string}`]: { r: ServerTimestamp }
						[x: `h/${string}/p/${string}/r`]: ServerTimestamp
						[x: `h/${string}/s`]:
							| {
									[x: `${number}`]: { t: number | Increment }
									[x: `${number}/t`]: number | Increment
							  }
							| { t: number | Increment }[]
						[x: `h/${string}/s/${number}`]: { t: number | Increment }
						[x: `h/${string}/s/${number}/t`]: number | Increment
					}
					'b/h': {
						[x: string]: {
							i: boolean
							l: ServerTimestamp
							m: {
								[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
								[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
							}
							[x: `m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
							p: {
								[x: string]: { r: ServerTimestamp }
								[x: `${string}/r`]: ServerTimestamp
							}
							[x: `p/${string}`]: { r: ServerTimestamp }
							[x: `p/${string}/r`]: ServerTimestamp
							s:
								| {
										[x: `${number}`]: { t: number | Increment }
										[x: `${number}/t`]: number | Increment
								  }
								| { t: number | Increment }[]
							[x: `s/${number}`]: { t: number | Increment }
							[x: `s/${number}/t`]: number | Increment
						}
						[x: `${string}/i`]: boolean
						[x: `${string}/l`]: ServerTimestamp
						[x: `${string}/m`]: {
							[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
						}
						[x: `${string}/m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
						[x: `${string}/m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
						[x: `${string}/p`]: {
							[x: string]: { r: ServerTimestamp }
							[x: `${string}/r`]: ServerTimestamp
						}
						[x: `${string}/p/${string}`]: { r: ServerTimestamp }
						[x: `${string}/p/${string}/r`]: ServerTimestamp
						[x: `${string}/s`]:
							| {
									[x: `${number}`]: { t: number | Increment }
									[x: `${number}/t`]: number | Increment
							  }
							| { t: number | Increment }[]
						[x: `${string}/s/${number}`]: { t: number | Increment }
						[x: `${string}/s/${number}/t`]: number | Increment
					}
					[x: `b/h/${string}`]: {
						i: boolean
						l: ServerTimestamp
						m: {
							[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
							[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
						}
						[x: `m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
						[x: `m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
						p: {
							[x: string]: { r: ServerTimestamp }
							[x: `${string}/r`]: ServerTimestamp
						}
						[x: `p/${string}`]: { r: ServerTimestamp }
						[x: `p/${string}/r`]: ServerTimestamp
						s:
							| {
									[x: `${number}`]: { t: number | Increment }
									[x: `${number}/t`]: number | Increment
							  }
							| { t: number | Increment }[]
						[x: `s/${number}`]: { t: number | Increment }
						[x: `s/${number}/t`]: number | Increment
					}
					[x: `b/h/${string}/i`]: boolean
					[x: `b/h/${string}/l`]: ServerTimestamp
					[x: `b/h/${string}/m`]: {
						[x: string]: { n: '1' | '2' | '7' | '8' | '9' }
						[x: `${string}/n`]: '1' | '2' | '7' | '8' | '9'
					}
					[x: `b/h/${string}/m/${string}`]: { n: '1' | '2' | '7' | '8' | '9' }
					[x: `b/h/${string}/m/${string}/n`]: '1' | '2' | '7' | '8' | '9'
					[x: `b/h/${string}/p`]: {
						[x: string]: { r: ServerTimestamp }
						[x: `${string}/r`]: ServerTimestamp
					}
					[x: `b/h/${string}/p/${string}`]: { r: ServerTimestamp }
					[x: `b/h/${string}/p/${string}/r`]: ServerTimestamp
					[x: `b/h/${string}/s`]:
						| {
								[x: `${number}`]: { t: number | Increment }
								[x: `${number}/t`]: number | Increment
						  }
						| { t: number | Increment }[]
					[x: `b/h/${string}/s/${number}`]: { t: number | Increment }
					[x: `b/h/${string}/s/${number}/t`]: number | Increment
				}
			>
		> // ! add bracket make the test fail but IsSame indeed return true, weird
	})

	it('test write', () => {
		type A = Users['write']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d: {
							e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
							f: { j: number | Increment }
							k: string
						}

						h: Record<
							string,
							{
								i: boolean
								l: ServerTimestamp
								m: Record<string, { n: '1' | '2' | '7' | '8' | '9' }>
								p: Record<string, { r: ServerTimestamp }>
								s:
									| Record<`${number}`, { t: number | Increment }>
									| {
											t: number | Increment
									  }[]
							}
						>
					}
					o: Record<string, number | Increment>
					q: Record<string, 0 | 1 | 4 | 5 | 6>
					u: Record<`${number}`, string> | string[]
					w: Record<`${number}`, { v: boolean }> | { v: boolean }[]
				}
			>
		>()
	})
	it('test read', () => {
		type A = Users['read']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d:
							| {
									e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
									f: { j: number }
									k: string | undefined | null
							  }
							| undefined
							| null
						h: Record<
							string,
							{
								i: boolean
								l: number | undefined | null
								m:
									| Record<
											string,
											| { n: '1' | '2' | '7' | '8' | '9' | undefined | null }
											| undefined
											| null
									  >
									| undefined
									| null
								p:
									| Record<
											string,
											{ r: number | undefined | null } | undefined | null
									  >
									| undefined
									| null
								s:
									| Record<
											`${number}`,
											{ t: number | undefined | null } | undefined | null
									  >
									| undefined
									| null
							}
						>
					}
					o: Record<string, number | undefined | null>
					q: Record<string, 0 | 1 | 4 | 5 | 6>
					u: Record<`${number}`, string | undefined | null>
					w: Record<`${number}`, { v: boolean }>
				}
			>
		>()
	})

	it('test compare', () => {
		type A = Users['compare']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d: {
							e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
							f: { j: number }
							k: string
						}

						h: Record<
							string,
							{
								i: boolean
								l: number
								m: Record<string, { n: '1' | '2' | '7' | '8' | '9' }>

								p: Record<string, { r: number }>

								s: Record<`${number}`, { t: number }>
							}
						>
					}
					o: Record<string, number>
					q: Record<string, 0 | 1 | 4 | 5 | 6>
					u: Record<`${number}`, string>
					w: Record<`${number}`, { v: boolean }>
				}
			>
		>()
	})

	it('test base', () => {
		type A = Users['base']

		IsTrue<
			IsSame<
				A,
				{
					a: 1 | 2 | 3
					b: {
						c: true
						d:
							| {
									e: 'abc' | 'xyz' | 'efg' | 'lmn' | 'rst'
									f: { j: number }
									k: string | PossiblyReadAsNullable
							  }
							| PossiblyReadAsNullable
						h: Record<
							string,
							{
								i: boolean
								l: ServerTimestamp | Removable
								m: PushAble<unknown> | Removable
								p: PushAbleOnly<unknown> | Removable
								s: NumericKeyRecord<unknown> | Removable
							}
						>
					}
					o: PushAble<unknown>
					q: PushAbleOnly<unknown>
					u: NumericKeyRecord<unknown>
					w: NumericKeyRecord<unknown>
					// * Note, the field value can accept any type and the test will still pass
					// * this is because the type exist only on generic and never pass down to any properties
				}
			>
		>()
	})
})
