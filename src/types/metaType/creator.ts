import { ObjectFlattenHybrid } from './objectFlatten'
import {
	ReplaceInvalidDataTypeRead,
	ReplaceInvalidDataTypeBase,
	ReplaceInvalidDataTypeWrite,
	ReplaceRemove,
	ReplaceRemoveWithUndefined,
} from './replaceInvalidDataType'
import { ReadTypeConverter, WriteTypeConverter } from './typeConverter'

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
	Write = ReplaceInvalidDataTypeWrite<WriteTypeConverter<ReplaceRemove<Base>>>,
	Read = ReplaceInvalidDataTypeRead<
		ReadTypeConverter<ReplaceRemoveWithUndefined<Base>>
	>,
	Compare = ReplaceInvalidDataTypeRead<ReadTypeConverter<ReplaceRemove<Base>>>
> = {
	base: ReplaceInvalidDataTypeBase<Base>
	flatten_base: ObjectFlattenHybrid<ReplaceInvalidDataTypeBase<Base>>
	write: Write
	flatten_write: ObjectFlattenHybrid<Write>
	read: Read
	compare: Compare
	flatten_compare: ObjectFlattenHybrid<Compare>
}
