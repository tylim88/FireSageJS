export type IsNumericRecordType<T> = T extends Record<string, unknown>
	? T extends Record<infer X, unknown>
		? X extends number
			? true
			: `${number}` extends `${X & (string | number)}`
			? `${X & (string | number)}` extends `${number}`
				? true
				: false
			: false
		: false
	: false

// not in use
export type IsStringRecordType<T> = T extends Record<string, unknown>
	? T extends Record<infer X, unknown>
		? `${X & (string | number)}` extends `${number}`
			? false
			: true
		: false
	: false

// https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union
type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IsTrue = <T extends true>() => {
	//
} // for type assertion, normally use with IsSame or IEqual

// https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
export type IsSame<T, U> = (<G>() => G extends T ? 1 : 2) extends <
	G
>() => G extends U ? 1 : 2
	? true
	: false

export type IsEqual<T, U> = T[] extends U[]
	? U[] extends T[]
		? true
		: false
	: false
