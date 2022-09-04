export type ErrorInvalidOnChildType<T extends string | undefined> =
	`Error: You can only listen to onChild event of data type Record<string, T>, PushAble<T>, PushAbleOnly<T>, OR NumericKeyRecord<T>. But the data type of path ${T extends string
		? T
		: 'root'} is neither of those`
