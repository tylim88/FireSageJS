import {
	GetLastTwoSegment,
	GetLastPart,
	RemoveLastSegment,
	GetFirstSegment,
	RemoveFirstSegment,
} from './stringManipulation'
import { IsTrue, IsSame } from './utils'

describe('test', () => {
	it('test last 2 segments', () => {
		// @ts-expect-error
		type A = GetLastTwoSegment<'a'>
		type B = GetLastTwoSegment<'a/b'>
		type C = GetLastTwoSegment<'a/b/c'>
		type D = GetLastTwoSegment<'a/b/c/d'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a/b'>>()
		IsTrue<IsSame<C, 'b/c'>>()
		IsTrue<IsSame<D, 'c/d'>>()
	})

	it('test get last part', () => {
		type A = GetLastPart<'a'>
		type B = GetLastPart<'a/b'>
		type C = GetLastPart<'a/b/c'>
		type D = GetLastPart<'a/b/c/d'>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, 'c'>>()
		IsTrue<IsSame<D, 'd'>>()
	})

	it('test Remove Last Segment', () => {
		type A = RemoveLastSegment<'a'>
		type B = RemoveLastSegment<'a/b'>
		type C = RemoveLastSegment<'a/b/c'>
		type D = RemoveLastSegment<'a/b/c/d'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'a/b'>>()
		IsTrue<IsSame<D, 'a/b/c'>>()
	})

	it('test Get First Segment', () => {
		type A = GetFirstSegment<'a'>
		type B = GetFirstSegment<'a/b'>
		type C = GetFirstSegment<'a/b/c'>
		type D = GetFirstSegment<undefined>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'a'>>()
		IsTrue<IsSame<D, undefined>>()
	})

	it('test Remove First Segment', () => {
		type A = RemoveFirstSegment<'a'>
		type B = RemoveFirstSegment<'a/b'>
		type C = RemoveFirstSegment<`a/${string}/c`>
		type D = RemoveFirstSegment<undefined>
		type E = RemoveFirstSegment<`${string}/c`>
		IsTrue<IsSame<A, ''>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, `${string}/c`>>()
		IsTrue<IsSame<D, ''>>()
		IsTrue<IsSame<E, 'c'>>()
	})
})
