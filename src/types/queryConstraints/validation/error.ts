export type ErrorMultipleOrderBy =
	`Error: You can't combine multiple orderBy calls.`
export type ErrorMultipleOrderByCursor =
	`Error: You can't combine multiple orderBy calls. Remove extra orderBy(s) before proceed`
export type ErrorQueryConstraintsIsNotTuple =
	`Error: The query constraints type must be a tuple. Note: array type is not tuple type but you can convert it to tuple by assert it as const, eg: "[1,2,3] as const`
export type ErrorCursorMustHasOrderBy =
	`Error: missing orderBy clause, startAt, startAfter, endAt, endBefore or equalTo need orderBy to work`
export type ErrorOrderByChildMustStartAtGrandChildPath<
	T extends string,
	U extends string | undefined
> = `Error: '${T}' is not a valid orderByChild path of '${U}'. The path must start at grandchild path. Eg the valid orderByChild path of node 'a/b/c/d' is 'c' or 'c/d'. Path that has no grandchild key, eg 'a/b' are not able to orderbyChild.`
export type ErrorOrderingByKeyOnlyOneArgument =
	`Error: When ordering by key, you may only pass one argument to startAt(), startAfter(), endAt(), endBefore() or equalTo()`
export type ErrorOrderingByKeyMustBeString =
	`Error: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore() or equalTo() must be a string.`
export type ErrorOderByPriority =
	`Error: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).`
export type ErrorNeedStringKeyCursor =
	`Error: you are trying to use numeric string key on non-numeric string key. Example: the path type is '${string}' but your input is '${number}'`
export type ErrorNeedNumericKeyCursor =
	`Error: you are trying to use non-numeric string key on numeric string key. Example: the path type is '${number}' but your input is '${string}'`
