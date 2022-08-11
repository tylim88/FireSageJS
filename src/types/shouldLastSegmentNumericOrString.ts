import { MetaType } from './metaType'
import { GetLastSegment } from './stringManipulation'
import {
	ErrorNodeNeedToBeStringButFoundNumber,
	ErrorNodeNeedToBeNumberButFoundString,
} from './error'

export type ShouldLastSegmentNumericOrString<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Input extends string | undefined
> = U extends string
	? Input extends string
		? GetLastSegment<U> extends `${number}`
			? GetLastSegment<Input> extends `${number}`
				? Input
				: ErrorNodeNeedToBeNumberButFoundString<U>
			: GetLastSegment<Input> extends `${number}`
			? ErrorNodeNeedToBeStringButFoundNumber<U>
			: Input
		: Input
	: Input
