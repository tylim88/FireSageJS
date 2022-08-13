import { MetaType } from './metaType'
import { GetLastSegment } from './stringManipulation'
import { ErrorLastSegmentNeedString, ErrorLastSegmentNeedNumber } from './error'

export type ReplaceInvalidLastSegment<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Input extends string | undefined
> = U extends string
	? Input extends string
		? GetLastSegment<U> extends `${number}`
			? GetLastSegment<Input> extends `${number}`
				? Input
				: ErrorLastSegmentNeedNumber<U>
			: GetLastSegment<Input> extends `${number}`
			? ErrorLastSegmentNeedString<U>
			: Input
		: Input
	: Input
