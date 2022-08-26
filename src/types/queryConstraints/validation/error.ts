export type ErrorMultipleOrderBy =
	`Error: You can't combine multiple orderBy calls.`
export type ErrorMultipleOrderByCursor =
	`Error: You can't combine multiple orderBy calls. Remove extra orderBy(s) before proceed`
export type ErrorQueryConstraintsIsNotTuple =
	`Error: The query constraints type must be tuple. Note: array type is not tuple type but you can convert it to tuple by assert it as const, eg: "[1,2,3] as const`
export type ErrorCursorMustHasOrderBy =
	`Error: missing orderBy clause, startAt, startAfter, endAt, endBefore or equalTo need orderBy to work`
export type ErrorOrderByChildMustStartAtGrandChildPath<
	T extends string,
	U extends string | undefined
> = `Error: ${T} is not a valid orderByChild path of ${U}. The path must start at grandchild path. Eg the valid orderByChild path of node 'a/b/c/d' is 'c' or 'c/d'`
export type ErrorOrderingByKeyOnlyOneArgument =
	`When ordering by key, you may only pass one argument to startAt(), startAfter(), endAt(), endBefore() or equalTo().`
export type ErrorOrderByNeedNonNumericStringKey =
	`Error: Invalid key, the type of key is non numeric string but got numeric string`
export type ErrorKeyMustBeString =
	`Error: The key argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string. `
