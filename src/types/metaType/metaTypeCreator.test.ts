import { ServerTimestamp, Increment } from '../fieldValue'
import { IsTrue, IsSame } from '../utils'
import { Users } from '../../utilForTests'

describe('test generated meta type', () => {
	it('test flatten_write', () => {
		type A = Users['flatten_write']

		IsTrue<
			IsSame<
				A,
				{
					o: { [x: string]: number | Increment }
					[x: `o/${string}`]: number | Increment
					a: 1 | 2 | 3
					b: {
						c: true
						d: {
							e: 'abc' | 'xyz' | 'efg'
							f: {
								j: number | Increment
							}
							'f/j': number | Increment
							k: string
						}
						h: {
							[x: string]: {
								i: boolean
								l: ServerTimestamp
								m: { [x: string]: { n: '7' | '8' | '9' } }
								[x: `m/${string}`]: { n: '7' | '8' | '9' }
								[x: `m/${string}/n`]: '7' | '8' | '9'
							}
						}
						[x: `h/${string}`]: {
							i: boolean
							l: ServerTimestamp
							m: {
								[x: string]: { n: '7' | '8' | '9' }
							}
							[x: `m/${string}`]: { n: '7' | '8' | '9' }
							[x: `m/${string}/n`]: '7' | '8' | '9'
						}
						[x: `h/${string}/i`]: boolean
						[x: `h/${string}/l`]: ServerTimestamp
						[x: `h/${string}/m`]: {
							[x: string]: { n: '7' | '8' | '9' }
						}
						[x: `h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
						[x: `h/${string}/m/${string}/n`]: '7' | '8' | '9'
						'd/e': 'abc' | 'xyz' | 'efg'
						'd/f': {
							j: number | Increment
						}
						'd/f/j': number | Increment
						'd/k': string
					}
					'b/c': true
					'b/d': {
						e: 'abc' | 'xyz' | 'efg'
						f: {
							j: number | Increment
						}
						'f/j': number | Increment
						k: string
					}
					'b/d/e': 'abc' | 'xyz' | 'efg'
					'b/d/f': {
						j: number | Increment
					}
					'b/d/f/j': number | Increment
					'b/d/k': string
					'b/h': {
						[x: string]: {
							i: boolean
							l: ServerTimestamp
							m: { [x: string]: { n: '7' | '8' | '9' } }
							[x: `m/${string}`]: { n: '7' | '8' | '9' }
							[x: `m/${string}/n`]: '7' | '8' | '9'
						}
					}
					[x: `b/h/${string}`]: {
						i: boolean
						l: ServerTimestamp
						m: { [x: string]: { n: '7' | '8' | '9' } }
						[x: `m/${string}`]: { n: '7' | '8' | '9' }
						[x: `m/${string}/n`]: '7' | '8' | '9'
					}
					[x: `b/h/${string}/i`]: boolean
					[x: `b/h/${string}/l`]: ServerTimestamp
					[x: `b/h/${string}/m`]: {
						[x: string]: { n: '7' | '8' | '9' }
					}
					[x: `b/h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
					[x: `b/h/${string}/m/${string}/n`]: '7' | '8' | '9'
				}
			>
		>
	})
})
