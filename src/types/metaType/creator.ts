import { ObjectFlatten } from './objectFlatten'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceRemove,
	ReplaceRemoveWithUndefined,
	ReplaceInvalidUnion,
} from './replaceInvalidDataType'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	AllNodesPossiblyReadAsNullable,
	CompareTypeConverter,
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
		ReplaceRemoveWithUndefined<
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
