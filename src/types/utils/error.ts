export type ErrorNeedStringKey =
	`Error: you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${string}' but your input is 'abc/${number}'`
export type ErrorInvalidOrNeedNumericKey =
	`Error: possible causes: 1) incorrect path eg: the path type is 'a/b/c' but your input is 'a/f/c' OR 2) incomplete input, eg: the path type is 'a/b/${string}' but your input is 'a/b/' OR 3) extra or missing segment, eg: the path type is 'a/b/${string}' but your input is 'a/b' or 'a/b/c/d' OR 4) you are trying to use non-numeric string key on numeric string key. eg: the path type is 'abc/${number}' but your input is 'abc/${string}'`
export type ErrorNeedNumericKey =
	'Error: Key must be numeric. Example: the data type is { 1: boolean} but your input is { a: boolean }'
export type ErrorNoInValidCharacter =
	`Error: Path must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
