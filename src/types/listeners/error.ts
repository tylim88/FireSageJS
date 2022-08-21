export type ErrorInvalidOnChildType<T extends string | undefined> =
	`Error: You can only listen to on child event of type Record<string, T>, PushAble<T>, PushAbleOnly<T>, OR PseudoArray<T>. But the data type of path ${T extends string
		? T
		: 'root'} is neither of those`
