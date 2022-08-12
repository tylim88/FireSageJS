import {
	ServerTimestamp,
	Increment,
	Removable,
	PushAble,
	PushAbleOnly,
	PseudoArray,
} from '../fieldValue'
import { IsTrue, IsSame } from '../utils'
import { Users } from '../../utilForTests'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceRemove,
	ReplaceRemoveWithUndefined,
} from './replaceInvalidDataType'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	AllNodesPossiblyReadAsUndefined,
} from './typeConverter'
import { ObjectFlatten } from './objectFlatten'

type u = ObjectFlatten<
	WriteTypeConverter<
		ReplaceInvalidDataTypeWrite<ReplaceRemove<{ a: PushAbleOnly<number> }>>
	>
>

type o = WriteTypeConverter<
	ReplaceInvalidDataTypeWrite<ReplaceRemove<{ a: PushAbleOnly<number> }>>
>
describe('test generated meta type', () => {
	it('test flatten_write', () => {
		type A = Users['flatten_write']
		type B = A[`q/${string}`]
		IsTrue<
			IsSame<
				| {
						[x: `${number}`]: string
				  }
				| string[],
				| string[]
				| {
						[x: `${number}`]: string
				  }
			>
		>()

		IsTrue<
			IsSame<
				A,
				{
					o: { [x: string]: number | Increment }
					q: { [x: string]: 4 | 5 | 6 }
					u: { [x: `${number}`]: string } | string[]
					[x: `o/${string}`]: number | Increment
					[x: `q/${string}`]: 4 | 5 | 6
					[x: `u/${number}`]: string
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
								p: { [x: string]: { r: ServerTimestamp } }
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
						}
						[x: `h/${string}`]: {
							i: boolean
							l: ServerTimestamp
							m: {
								[x: string]: { n: '7' | '8' | '9' }
							}
							[x: `m/${string}`]: { n: '7' | '8' | '9' }
							[x: `m/${string}/n`]: '7' | '8' | '9'
							p: { [x: string]: { r: ServerTimestamp } }
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
							[x: string]: { n: '7' | '8' | '9' }
						}
						[x: `h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
						[x: `h/${string}/m/${string}/n`]: '7' | '8' | '9'
						[x: `h/${string}/p`]: { [x: string]: { r: ServerTimestamp } }
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
							p: { [x: string]: { r: ServerTimestamp } }
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
					}
					[x: `b/h/${string}`]: {
						i: boolean
						l: ServerTimestamp
						m: { [x: string]: { n: '7' | '8' | '9' } }
						[x: `m/${string}`]: { n: '7' | '8' | '9' }
						[x: `m/${string}/n`]: '7' | '8' | '9'
						p: { [x: string]: { r: ServerTimestamp } }
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
						[x: string]: { n: '7' | '8' | '9' }
					}
					[x: `b/h/${string}/m/${string}`]: { n: '7' | '8' | '9' }
					[x: `b/h/${string}/m/${string}/n`]: '7' | '8' | '9'
					[x: `b/h/${string}/p`]: { [x: string]: { r: ServerTimestamp } }
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
		>
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
							e: 'abc' | 'xyz' | 'efg'
							f: { j: number | Increment }
							k: string
						}

						h: Record<
							string,
							{
								i: boolean
								l: ServerTimestamp
								m: Record<string, { n: '7' | '8' | '9' }>
								p: Record<string, { r: ServerTimestamp }>
								s:
									| Record<number, { t: number | Increment }>
									| {
											t: number | Increment
									  }[]
							}
						>
					}
					o: Record<string, number | Increment>
					q: Record<string, 4 | 5 | 6>
					u: Record<number, string> | string[]
				}
			>
		>
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
									e: 'abc' | 'xyz' | 'efg'
									f: { j: number }
									k: string | undefined
							  }
							| undefined
						h: Record<
							string,
							{
								i: boolean
								l: number | undefined
								m:
									| Record<string, { n: '7' | '8' | '9' | undefined }>
									| undefined
								p: Record<string, { r: number | undefined }> | undefined
								s: { t: number | undefined }[] | undefined
							}
						>
					}
					o: Record<string, number>
					q: Record<string, 4 | 5 | 6>
					u: string[]
				}
			>
		>
	})

	// it('test compare', () => {
	// 	type A = Users['compare']

	// 	IsTrue<
	// 		IsSame<
	// 			A,
	// 			{
	// 				a: 1 | 2 | 3
	// 				b: {
	// 					c: true
	// 					d: {
	// 						e: 'abc' | 'xyz' | 'efg'
	// 						f: { j: number }
	// 						k: string
	// 					}

	// 					h: Record<
	// 						string,
	// 						{
	// 							i: boolean
	// 							l: number
	// 							m: Record<string, { n: '7' | '8' | '9' }>
	// 							p: Record<string, { r: number }>
	// 							s: { t: number }[]
	// 						}
	// 					>
	// 				}
	// 				o: Record<string, number>
	// 				q: Record<string, 4 | 5 | 6>
	// 				u: string[]
	// 			}
	// 		>
	// 	>
	// })

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
									e: 'abc' | 'xyz' | 'efg'
									f: { j: number }
									k: string | Removable
							  }
							| Removable
						h: Record<
							string,
							{
								i: boolean
								l: ServerTimestamp | Removable
								m: PushAble<{ n: '7' | '8' | '9' | Removable }> | Removable
								p: PushAbleOnly<{ r: ServerTimestamp | Removable }> | Removable
								s: PseudoArray<{ t: number | Removable }> | Removable
							}
						>
					}
					o: PushAble<number>
					q: PushAbleOnly<4 | 5 | 6>
					u: PseudoArray<string>
				}
			>
		>
	})
})
