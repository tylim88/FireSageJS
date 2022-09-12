import { ObjectFlatten } from './objectFlatten'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceInvalidUnion,
	ReplaceRemove,
} from './replaceInvalidDataType'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	AllNodesPossiblyReadAsNullable,
	CompareTypeConverter,
	ReplaceRemoveWithNullable,
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
		ReplaceRemove<ReplaceInvalidDataTypeWrite<ReplaceInvalidUnion<Base>>>
	>,
	Read = ReadTypeConverter<
		ReplaceRemoveWithNullable<
			ReplaceInvalidDataTypeRead<ReplaceInvalidUnion<Base>>
		>
	>,
	Compare = CompareTypeConverter<
		ReplaceRemove<ReplaceInvalidDataTypeRead<ReplaceInvalidUnion<Base>>>
	>
> = {
	base: ReplaceInvalidDataTypeBase<ReplaceInvalidUnion<Base>>
	write: Write
	flatten_write: ObjectFlatten<Write>
	read: Settings['AllNodesPossiblyReadAsNullable'] extends true
		? AllNodesPossiblyReadAsNullable<Read>
		: Read
	compare: Compare
}
