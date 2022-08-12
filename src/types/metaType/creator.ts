import { ObjectFlatten } from './objectFlatten'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceRemove,
	ReplaceRemoveWithUndefined,
} from './replaceInvalidDataType'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	AllNodesPossiblyReadAsUndefined,
} from './typeConverter'

export type MetaType = {
	base: unknown
	flatten_base: unknown
	write: unknown
	flatten_write: unknown
	read: unknown
	compare: unknown
	flatten_compare: unknown
}

export type MetaTypeCreator<
	Base,
	Settings extends { AllNodesPossiblyReadAsUndefined?: boolean } = {
		AllNodesPossiblyReadAsUndefined: false
	},
	Write = WriteTypeConverter<ReplaceInvalidDataTypeWrite<ReplaceRemove<Base>>>,
	Read = ReadTypeConverter<
		ReplaceInvalidDataTypeRead<ReplaceRemoveWithUndefined<Base>>
	>,
	Compare = ReplaceInvalidDataTypeRead<ReadTypeConverter<ReplaceRemove<Base>>>
> = {
	base: ReplaceInvalidDataTypeBase<Base>
	flatten_base: ObjectFlatten<ReplaceInvalidDataTypeBase<Base>>
	write: Write
	flatten_write: ObjectFlatten<Write>
	read: Settings['AllNodesPossiblyReadAsUndefined'] extends true
		? AllNodesPossiblyReadAsUndefined<Read>
		: Read
	compare: Compare
	flatten_compare: ObjectFlatten<Compare>
}
