import {
	GetLastTwoSegment,
	GetLastSegment,
	RemoveLastSegment,
} from './stringCommon'
import { IsTrue, IsSame } from './isCommon'

describe('test', () => {
	it('test last 2 segments', () => {
		// @ts-expect-error
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
})
