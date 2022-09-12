import { ObjectFlatten } from './objectFlatten'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceInvalidUnion,
} from './replaceInvalidDataType'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	ReplaceAllNodesPossiblyReadAsNullableWithNullable,
	CompareTypeConverter,
	ReplaceRemoveAndPossiblyReadAsNullableWithNever,
	ReplaceRemoveAndPossiblyReadAsNullableWithNullable,
} from './typeConverter'

export type MetaType = {
	base: unknown
	write: unknown
	flatten_write: unknown
	read: unknown
	compare: unknown
}

export type MetaTypeCreator<
	Base,
	Settings extends { AllNodesPossiblyReadAsNullable?: boolean } = {
		AllNodesPossiblyReadAsNullable: false
	},
	Write = WriteTypeConverter<
		ReplaceRemoveAndPossiblyReadAsNullableWithNever<
			ReplaceInvalidDataTypeWrite<ReplaceInvalidUnion<Base>>
		>
	>,
	Read = ReadTypeConverter<
		ReplaceRemoveAndPossiblyReadAsNullableWithNullable<
			ReplaceInvalidDataTypeRead<ReplaceInvalidUnion<Base>>
		>
	>,
	Compare = CompareTypeConverter<
		ReplaceRemoveAndPossiblyReadAsNullableWithNever<
			ReplaceInvalidDataTypeRead<ReplaceInvalidUnion<Base>>
		>
	>
> = {
	base: ReplaceInvalidDataTypeBase<ReplaceInvalidUnion<Base>>
	write: Write
	flatten_write: ObjectFlatten<Write>
	read: Settings['AllNodesPossiblyReadAsNullable'] extends true
		? ReplaceAllNodesPossiblyReadAsNullableWithNullable<Read>
		: Read
	compare: Compare
}
