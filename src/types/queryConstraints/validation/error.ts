import { CursorTypes } from '../queryConstraint'

export type ErrorMultipleOrderBy =
	`Error: You can't combine multiple orderBy calls.`
export type ErrorMultipleOrderByCursor =
	`Error: You can't combine multiple orderBy calls. Remove extra orderBy(s) before proceed`
export type ErrorQueryConstraintsIsNotTuple =
	`Error: The query constraints type must be a tuple. Note: array type is not tuple type but you can convert it to tuple by assert it as const, eg: '[1,2,3] as const'`
export type ErrorCursorMustHasOrderBy =
	`Error: missing orderBy clause; startAt, startAfter, endAt, endBefore or equalTo need orderBy to work`
export type ErrorOrderByChildMustStartAtGrandChildPath<
	T extends string,
	U extends string | undefined
> = `Error: '${T}' is not a valid orderByChild path of '${U}'. The path must start at grandchild path. Eg the valid orderByChild path of node 'a/b/c/d' is 'c' or 'c/d'. Path that has no grandchild key, eg 'a/b' are not able to orderbyChild.`
export type ErrorOrderingByKeyOnlyOneArgument =
	`Error: When ordering by key, you may only pass one argument to startAt(), startAfter(), endAt(), endBefore() or equalTo()`
export type ErrorOrderingByKeyMustBeString =
	`Error: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore() or equalTo() must be a numeric or non-numeric string.`
export type ErrorOderByPriority =
	`Error: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).`
export type ErrorNeedStringKeyCursor =
	`Error: You are trying to use numeric string key on non-numeric string key. Eg: the path type is '${string}' but your input is '${number}'`
export type ErrorNeedNumericKeyCursor =
	`Error: You are trying to use non-numeric string key on numeric string key. Eg: the path type is '${number}' but your input is '${string}'`
export type ErrorCursorMustBeUnique<T extends CursorTypes> =
	`Error: Cursor must be unique but you have duplicated cursor '${T}'`
export type ErrorCannotUseStartAtStartAfterTogether =
	`Error: You cannot use both 'startAt' and 'startAfter' in the same query`
export type ErrorCannotUseEndAtEndBeforeTogether =
	`Error: You cannot use both 'endAt' and 'endBefore' in the same query`
export type ErrorEqualToMustBeTheOnlyCursor =
	`Error: You cannot use 'equalTo' with any other cursor in the same query`
export type ErrorMustOrderByChildWithPrimitiveType<T extends string> =
	`Error: Possible causes: 1) You can only order by child where the child type is string, number, boolean or null. But the type of '${T}' is neither of those. 2) Your path did not start at grandChild.`
