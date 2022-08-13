import { MetaType } from './metaType'
import { GetLastSegment } from './stringManipulation'
import { ErrorLastSegmentNeedString } from './error'
import { FindMetaPathType } from './findTypeAndKey'

// string does not extends `${number}` so we can handle this case by simply return V
// `${number}` extends string so we need to handle this case
export type ReplaceInvalidLastSegment<
	T extends MetaType,
	U extends keyof T['flatten_write'] & string,
	V extends string
> = FindMetaPathType<T, U> extends never
	? V // return V if trying to assign string to `${number}`
	: FindMetaPathType<T, U> extends infer Z extends string
	? GetLastSegment<Z> extends `${string}`
		? GetLastSegment<U> extends `${number}`
			? ErrorLastSegmentNeedString<Z>
			: U
		: U
	: U
