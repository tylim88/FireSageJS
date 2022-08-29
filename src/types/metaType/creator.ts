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
	AllNodesPossiblyReadAsUndefined,
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
	Settings extends { AllNodesPossiblyReadAsUndefined?: boolean } = {
		AllNodesPossiblyReadAsUndefined: false
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
	read: Settings['AllNodesPossiblyReadAsUndefined'] extends true
		? AllNodesPossiblyReadAsUndefined<Read>
		: Read
	compare: Compare
}
