import {
	GetLastTwoSegment,
	GetLastSegment,
	RemoveLastSegment,
	IsSameOrSubStringOfEither,
	GetFirstSegment,
	RemoveFirstSegment,
} from './string'
import { IsTrue, IsSame } from './is'

describe('test', () => {
	it('test last 2 segments', () => {
		type A = GetLastTwoSegment<'a'>
		type B = GetLastTwoSegment<'a/b'>
		type C = GetLastTwoSegment<'a/b/c'>
		type D = GetLastTwoSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a/b'>>()
		IsTrue<IsSame<C, 'b/c'>>()
		IsTrue<IsSame<D, `${string}/d`>>()
	})

	it('test get last segment', () => {
		type A = GetLastSegment<'a'>
		type B = GetLastSegment<'a/b'>
		type C = GetLastSegment<`a/b/${string}`>
		type D = GetLastSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, string>>()
		IsTrue<IsSame<D, 'd'>>()
	})

	it('test Remove Last Segment', () => {
		type A = RemoveLastSegment<'a'>
		type B = RemoveLastSegment<'a/b'>
		type C = RemoveLastSegment<`a/b/${string}`>
		type D = RemoveLastSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'a/b'>>()
		IsTrue<IsSame<D, `a/b/${string}`>>()
	})

	it('test is sub string of, positive case', () => {
		type A = IsSameOrSubStringOfEither<'a', 'a'>
		type B = IsSameOrSubStringOfEither<'a/b', 'a'>
		type C = IsSameOrSubStringOfEither<'a', 'a/b'>
		type D = IsSameOrSubStringOfEither<'a/b/c', 'a'>
		type E = IsSameOrSubStringOfEither<'a', 'a/b/c'>
		type F = IsSameOrSubStringOfEither<'a/b/c', 'a/b'>
		type G = IsSameOrSubStringOfEither<'a/b', 'a/b/c'>
		type H = IsSameOrSubStringOfEither<'a', `${string}`>
		type I = IsSameOrSubStringOfEither<`${string}`, 'a'>
		type J = IsSameOrSubStringOfEither<'a/b', `${string}`>
		type K = IsSameOrSubStringOfEither<`${string}`, 'a/b'>
		type L = IsSameOrSubStringOfEither<`a/b/${string}`, `${string}`>
		type M = IsSameOrSubStringOfEither<`${string}`, `a/b/${string}`>
		type N = IsSameOrSubStringOfEither<`a/b/${string}`, `${string}/b`>
		type O = IsSameOrSubStringOfEither<`${string}/b`, `a/b/${string}`>
		type P = IsSameOrSubStringOfEither<`a/b/${string}`, `a/${string}/c`>
		type Q = IsSameOrSubStringOfEither<`a/${string}/c`, `a/b/${string}`>
		type R = IsSameOrSubStringOfEither<`b/h/abc/m/xyz`, `b/h/abc`>
		IsTrue<IsSame<A, true>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, true>>()
		IsTrue<IsSame<D, true>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, true>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, true>>()
		IsTrue<IsSame<I, true>>()
		IsTrue<IsSame<J, true>>()
		IsTrue<IsSame<K, true>>()
		IsTrue<IsSame<L, true>>()
		IsTrue<IsSame<M, true>>()
		IsTrue<IsSame<N, true>>()
		IsTrue<IsSame<O, true>>()
		IsTrue<IsSame<P, true>>()
		IsTrue<IsSame<Q, true>>()
		IsTrue<IsSame<R, true>>()
	})

	it('test is sub string of, negative case', () => {
		type A = IsSameOrSubStringOfEither<'a', 'b'>
		type B = IsSameOrSubStringOfEither<'b/a', 'a'>
		type C = IsSameOrSubStringOfEither<'b', 'a/b'>
		type D = IsSameOrSubStringOfEither<'a/b/c', 'c'>
		type E = IsSameOrSubStringOfEither<'b', 'a/b/c'>
		type F = IsSameOrSubStringOfEither<'a/b/c', 'b/c'>
		type G = IsSameOrSubStringOfEither<'b/c', 'a/b/c'>
		type H = IsSameOrSubStringOfEither<'a/b', `${string}/c`>
		type I = IsSameOrSubStringOfEither<`${string}/c`, 'a/b'>
		type J = IsSameOrSubStringOfEither<`a/b/${string}`, `b/${string}`>
		type K = IsSameOrSubStringOfEither<`b/${string}`, `a/b/${string}`>
		type L = IsSameOrSubStringOfEither<`a/b/${string}`, `d/${string}/c`>
		type M = IsSameOrSubStringOfEither<`d/${string}/c`, `a/b/${string}`>
		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, false>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, false>>()
		IsTrue<IsSame<H, false>>()
		IsTrue<IsSame<I, false>>()
		IsTrue<IsSame<J, false>>()
		IsTrue<IsSame<K, false>>()
		IsTrue<IsSame<L, false>>()
		IsTrue<IsSame<M, false>>()
	})

	it('test Get First Segment', () => {
		type A = GetFirstSegment<'a'>
		type B = GetFirstSegment<`a/${string}`>
		type C = GetFirstSegment<`${string}/b/c`>
		type D = GetFirstSegment<undefined>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, string>>()
		IsTrue<IsSame<D, undefined>>()
	})

	it('test Remove First Segment', () => {
		type A = RemoveFirstSegment<'a'>
		type B = RemoveFirstSegment<'a/b'>
		type C = RemoveFirstSegment<`a/${string}/c`>
		type D = RemoveFirstSegment<undefined>
		type E = RemoveFirstSegment<`${string}/c`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, `${string}/c`>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, 'c'>>()
	})
})
