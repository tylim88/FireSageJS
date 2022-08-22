export type CreateArrayWithLengthX<
	LENGTH extends number,
	ACC extends unknown[] = []
> = ACC['length'] extends LENGTH
	? ACC
	: CreateArrayWithLengthX<LENGTH, [...ACC, 1]>

export type IsAGreaterThanB<
	A extends number[],
	B extends number[]
> = A['length'] extends B['length']
	? 'equal'
	: A extends [
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			infer C,
			...infer D extends number[]
	  ]
	? B extends [
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			infer M,
			...infer N extends number[]
	  ]
		? IsAGreaterThanB<D, N>
		: 'greater'
	: B['length'] extends 0
	? 'equal'
	: 'lesser'
