export type ErrorNeedStringKey =
	`Error: you are trying to use numeric string key on non-numeric string key. Example: the path type is 'abc/${string}' but your input is 'abc/${number}'`
export type ErrorInvalidOrNeedNumericKey =
	`Error: possible causes: 1) incorrect path OR 2) you are trying to use non-numeric string key on numeric string key. Example: the path type is 'abc/${number}' but your input is 'abc/${string}'`
export type ErrorNeedNumericKey =
	'Error: Key must be numeric. Example: the data type is { 1: boolean} but your input is { a:boolean }'
export type ErrorNoInValidCharacter =
	`Error: Path Or Key must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
