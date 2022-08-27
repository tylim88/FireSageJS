import {
	ReplaceInvalidUnion,
	ReplaceInvalidDataTypeBase,
} from './replaceInvalidDataType'
import {
	ErrorObjectTypeUnion,
	ErrorUsePseudoArrayInstead,
	ErrorInvalidKey,
} from './error'
import {
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	PseudoArray,
} from '../fieldType'
import { IsTrue, IsSame } from '../utils'
describe('test replace invalid data type', () => {
	it('test ReplaceUnionWithObjectWithErrorMessage, negative test', () => {
		type A = ReplaceInvalidUnion<{
			a: { b: 1 } | PushAble<unknown>
		}>
		type B = ReplaceInvalidUnion<{ a: { b: 1 } | { c: 1 } }>
		type C = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: { f: 2 } | 1 } }
		}>
		type D = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: { f: 2 } | null } }
		}>
		type E = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: PseudoArray<unknown> | undefined } }
		}>
		type F = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: PushAbleOnly<unknown> | string } }
		}>
		type G = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: { f: 2 } | PseudoArray<unknown> } }
		}>
		type H = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: { f: 2 } | PushAble<unknown> } }
		}>
		type I = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: PushAble<unknown> | PushAbleOnly<unknown> } }
		}>
		type J = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: PushAble<unknown> | ServerTimestamp } }
		}>
		type K = ReplaceInvalidUnion<{
			a: { b: 1; d: { e: { f: 2 } | boolean } }
		}>

		IsTrue<IsSame<A, { a: ErrorObjectTypeUnion }>>()
		IsTrue<IsSame<B, { a: ErrorObjectTypeUnion }>>()
		IsTrue<IsSame<C['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<D['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<E['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<F['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<G['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<H['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<I['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<J['a']['d']['e'], ErrorObjectTypeUnion>>()
		IsTrue<IsSame<K['a']['d']['e'], ErrorObjectTypeUnion>>()
	})
	it('test ReplaceUnionWithObjectWithErrorMessage, positive test', () => {
		type Z = {
			a:
				| { b: 1; d: { e: { f: 2 | Removable } | Removable } | Removable }
				| Removable
		}
		type A = ReplaceInvalidUnion<Z>
		IsTrue<IsSame<A, Z>>()
	})
	it('test replace record number', () => {
		type A = ReplaceInvalidDataTypeBase<{
			a: {
				b: Record<number, unknown>
				d: { e: { f: Record<number, unknown> }; g: boolean }
			}
		}>
		IsTrue<
			IsSame<
				A,
				{
					a: {
						b: ErrorUsePseudoArrayInstead
						d: { e: { f: ErrorUsePseudoArrayInstead }; g: boolean }
					}
				}
			>
		>()
	})
	it('test invalid key', () => {
		type A = ReplaceInvalidDataTypeBase<{
			a: {
				b: string
				d: { 'e.l': { f: number }; 'g[o': boolean }
				e: Record<string, number>
			}
		}>
		IsTrue<
			IsSame<
				A,
				{
					a: {
						b: string
						d: { 'e.l': ErrorInvalidKey<'e.l'>; 'g[o': ErrorInvalidKey<'g[o'> }
						e: Record<string, number>
					}
				}
			>
		>()
	})
})
