export type TransformUndefinedToRoot<T extends undefined | string> =
	T extends string ? `'${T}'` : `'root'`

export type ErrorNeedStringKey =
	`Error: you are trying to use numeric string key on non-numeric string key. Eg: the path type is 'abc/${string}' but your input is 'abc/${number}'`
export type ErrorInvalidOrNeedNumericKey =
	`Error: possible causes: 1) incorrect path eg: the path type is 'a/b/c' but your input is 'a/f/c' OR 2) incomplete input, eg: the path type is 'a/b/${string}' but your input is 'a/b/' OR 3) extra or missing segment, eg: the path type is 'a/b/${string}' but your input is 'a/b' or 'a/b/c/d' OR 4) you are trying to use non-numeric string key on numeric string key. Eg: the path type is 'abc/${number}' but your input is 'abc/${string}' OR 5) you are trying to use numeric string key on non-numeric string key. Eg: the path type is 'abc/${string}' but your input is 'abc/${number}'.`
export type ErrorNeedNumericKey =
	'Error: Object key must be numeric. Eg: the data type is { 1: T } but your input is { a: T }'
export type ErrorNeedNoNNumericKey =
	'Error: Object key must be non numeric. Eg: the data type is { a: T } but your input is { 1: T }'
export type ErrorNoInValidCharacter =
	`Error: Path must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
export type ErrorHasNoChild<T extends string | undefined> =
	`Error: Found no child of ${TransformUndefinedToRoot<T>} node, possible causes: 1) incorrect path eg: the path type is 'a/b/c' but your input is 'a/f/c' OR 2) incomplete input, eg: the path type is 'a/b/${string}' but your input is 'a/b/' OR 3) extra or missing segment, eg: the path type is 'a/b/${string}' but your input is 'a/b' or 'a/b/c/d' OR 4) you are trying to use non-numeric string key on numeric string key. Eg: the path type is 'abc/${number}' but your input is 'abc/${string}' OR 5) you are trying to use numeric string key on non-numeric string key. Eg: the path type is 'abc/${string}' but your input is 'abc/${number}'.`
export type ErrorIsNotChildPathOf<
	P extends string | undefined,
	C extends string
> = `Error: path '${C}' is not a child path of ${TransformUndefinedToRoot<P>}`
