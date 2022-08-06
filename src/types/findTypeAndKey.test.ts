import {
	FindParentKey,
	FindParentType,
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	IfIsPushAbleThenReturnV,
	IfIsRemoveAbleThenReturnV,
} from './findTypeAndKey'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'
import { Increment, ServerTimestamp, Push, Remove } from './fieldValue'
import { MetaTypeCreator } from './metaTypeCreator'
import { ErrorNotPushAble, ErrorNotRemoveAble } from './error'

describe('test', () => {
	it('test Find Parent Key', () => {
		type A = FindParentKey<Users, undefined>
		type B = FindParentKey<Users, 'a'>
		type C = FindParentKey<Users, 'b/d'>
		type D = FindParentKey<Users, 'b/d/f/j'>
		type E = FindParentKey<Users, `b/h/${string}`>
		type F = FindParentKey<Users, `b/h/${string}/i`>
		type G = FindParentKey<Users, `b/h`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, null>>()
		IsTrue<IsSame<C, 'b'>>()
		IsTrue<IsSame<D, 'b/d/f'>>()
		IsTrue<IsSame<E, 'b/h'>>()
		IsTrue<IsSame<F, `b/h/${string}`>>()
		IsTrue<IsSame<G, 'b'>>()
	})

	it('test Find All Child Keys', () => {
		type A = FindAllChildKeys<Users, undefined>
		type B = FindAllChildKeys<Users, 'a'>
		type C = FindAllChildKeys<Users, 'b/d'>
		type D = FindAllChildKeys<Users, 'b/d/f/j'>
		type E = FindAllChildKeys<Users, `b/h/${string}`>
		type F = FindAllChildKeys<Users, `b/h/${string}/i`>
		type G = FindAllChildKeys<Users, `b/h`>
		type H = FindAllChildKeys<Users, `b/h/${string}/l`>

		IsTrue<IsSame<A, keyof Users['flatten_write']>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k' | 'f/j'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, 'i' | 'l' | 'm' | `m/${string}` | `m/${string}/n`>>()
		IsTrue<IsSame<F, never>>()
		IsTrue<IsSame<G, string>>()
		IsTrue<IsSame<H, never>>()
	})

	it('test Find Parent Type', () => {
		type A = FindParentType<Users, undefined, 'write'>
		type B = FindParentType<Users, 'a', 'write'>
		type C = FindParentType<Users, 'b/d', 'write'>
		type D = FindParentType<Users, 'b/d/f/j', 'write'>
		type E = FindParentType<Users, `b/h/${string}`, 'write'>
		type F = FindParentType<Users, `b/h/${string}/i`, 'write'>
		type G = FindParentType<Users, `b/h`, 'write'>
		type H = FindParentType<Users, `b/h/${string}/l`, 'write'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, Users['write']>>()
		IsTrue<IsSame<C, Users['flatten_write']['b']>>()
		IsTrue<IsSame<D, Users['flatten_write']['b/d/f']>>()
		IsTrue<IsSame<E, Users['flatten_write']['b']['h']>>()
		IsTrue<IsSame<F, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<G, Users['flatten_write']['b']>>()
		IsTrue<IsSame<H, Users['flatten_write']['b']['h'][string]>>()
	})

	it('test Find Write Type', () => {
		type A = FindNestedTypeFromFullPath<Users, undefined, 'write'>
		type B = FindNestedTypeFromFullPath<Users, 'a', 'write'>
		type C = FindNestedTypeFromFullPath<Users, 'b/d', 'write'>
		type D = FindNestedTypeFromFullPath<Users, 'b/d/f/j', 'write'>
		type E = FindNestedTypeFromFullPath<Users, `b/h/${string}`, 'write'>
		type F = FindNestedTypeFromFullPath<Users, `b/h/${string}/i`, 'write'>
		type G = FindNestedTypeFromFullPath<Users, `b/h`, 'read'>
		type H = FindNestedTypeFromFullPath<Users, `b/h/${string}/l`, 'write'>
		type L = FindNestedTypeFromFullPath<Users, `b/h/${string}/l`, 'read'>
		IsTrue<IsSame<A, Users['write']>>()
		IsTrue<IsSame<B, 1 | 2 | 3>>()
		IsTrue<
			IsSame<
				C,
				{
					e: 'abc' | 'xyz' | 'efg'
					f: {
						j: number | Increment
					}
					k: string
				}
			>
		>()
		IsTrue<IsSame<D, number | Increment>>()
		IsTrue<
			IsSame<
				E,
				{
					i: boolean
					l: ServerTimestamp
					m: { [x: string]: { n: '7' | '8' | '9' } }
				}
			>
		>()
		IsTrue<IsSame<F, boolean>>()
		IsTrue<
			IsSame<
				G,
				{
					[x: string]: {
						i: boolean
						l: number
						m: { [x: string]: { n: '7' | '8' | '9' | undefined } }
					}
				}
			>
		>()
		IsTrue<IsSame<H, ServerTimestamp>>()
		IsTrue<IsSame<L, number>>()
	})

	it('test IfIsPushReturnV', () => {
		type Meta = MetaTypeCreator<{
			a: Push<{ b: 1; c: Push<number>; d: Push<{ j: 1 }> }>
		}>
		type A = IfIsPushAbleThenReturnV<Meta, undefined, true>
		type B = IfIsPushAbleThenReturnV<Meta, 'a', true>
		type C = IfIsPushAbleThenReturnV<Meta, `a/${string}`, true>
		type D = IfIsPushAbleThenReturnV<Meta, `a/${string}/b`, true>
		type E = IfIsPushAbleThenReturnV<Meta, `a/${string}/c`, true>
		type F = IfIsPushAbleThenReturnV<Meta, `a/${string}/c/${string}`, true>
		type G = IfIsPushAbleThenReturnV<Meta, `a/${string}/d`, true>
		type H = IfIsPushAbleThenReturnV<Meta, `a/${string}/d/${string}`, true>
		type I = IfIsPushAbleThenReturnV<Meta, `a/${string}/d/${string}/j`, true>

		IsTrue<IsSame<A, ErrorNotPushAble<undefined>>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, ErrorNotPushAble<`a/${string}`>>>()
		IsTrue<IsSame<D, ErrorNotPushAble<`a/${string}/b`>>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, ErrorNotPushAble<`a/${string}/c/${string}`>>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, ErrorNotPushAble<`a/${string}/d/${string}`>>>()
		IsTrue<IsSame<I, ErrorNotPushAble<`a/${string}/d/${string}/j`>>>()
	})

	it('test IfIsPushReturnV', () => {
		type Meta = MetaTypeCreator<{
			a: Push<{ b: 1; c: Remove | { k: boolean }; d: Push<{ j: Remove | 1 }> }>
		}>
		type A = IfIsRemoveAbleThenReturnV<Meta, undefined, true>
		type B = IfIsRemoveAbleThenReturnV<Meta, 'a', true>
		type C = IfIsRemoveAbleThenReturnV<Meta, `a/${string}`, true>
		type D = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/b`, true>
		type E = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/c`, true>
		type F = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/c/${string}`, true>
		type G = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/d`, true>
		type H = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/d/${string}`, true>
		type I = IfIsRemoveAbleThenReturnV<Meta, `a/${string}/d/${string}/j`, true>

		IsTrue<IsSame<A, ErrorNotRemoveAble<undefined>>>()
		IsTrue<IsSame<B, ErrorNotRemoveAble<'a'>>>()
		IsTrue<IsSame<C, ErrorNotRemoveAble<`a/${string}`>>>()
		IsTrue<IsSame<D, ErrorNotRemoveAble<`a/${string}/b`>>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, ErrorNotRemoveAble<`a/${string}/c/${string}`>>>()
		IsTrue<IsSame<G, ErrorNotRemoveAble<`a/${string}/d`>>>()
		IsTrue<IsSame<H, ErrorNotRemoveAble<`a/${string}/d/${string}`>>>()
		IsTrue<IsSame<I, true>>()
	})
})
