export type ErrorPathHasAncestor<
	Descendent extends string,
	Ancestor extends string
> = `Error: values argument contains a path '${Ancestor}' that is ancestor of another path '${Descendent}'`
export type ErrorInvalidSetPriorityRef<T extends string | undefined> =
	`Error: You can only set or set with priority if the parent data type is Record<string, T>, PushAble<T>, PushAbleOnly<T>, OR PseudoArray<T>. But the data type of path ${T extends string
		? T
		: 'root'} is neither of those`
export type ErrorNeedTupleNotArray =
	`Error: The type of argument is an array but requires tuple, it seem like you forgot to assert it as const, eg: '[1, 2, 3] as const'.`
export type ErrorIsPushOnlyAbleType<T extends string | undefined> =
	`Error: The '${T extends string
		? T
		: 'Root'}' data type is PushAbleOnly<T>, you cannot set or update PushAbleOnly<T> node, to add new node use 'push' instead of 'set'. You can still set or update the child nodes as long as they are not PushAbleOnly<T>. If you intend to update or set PushAbleOnly<T> node, change its type to PushAble<T>.`
export type ErrorElementNeedConstAssertion =
	`Error: Two causes, either or both: 1.)This element type is string, you may forgot to assert it as const, eg: 'abc' as const; 2) You are using number, please use string numeric instead, eg: instead of 1, use '1'.`
