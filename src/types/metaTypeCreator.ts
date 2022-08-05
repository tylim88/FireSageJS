import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidDataType } from './replaceInvalidData'
import {
	ReadTypeConverter,
	WriteTypeConverter,
	RemoveRemove,
	ReplaceRemoveWithUndefined,
} from './typeConverter'

export type MetaType = {
	base: unknown
	flatten_base: unknown
	write: unknown
	flatten_write: unknown
	read: unknown
	flatten_read: unknown
	compare: unknown
	flatten_compare: unknown
}

export type MetaTypeCreator<
	Base,
	Write = ReplaceInvalidDataType<WriteTypeConverter<RemoveRemove<Base>>>,
	Read = ReplaceInvalidDataType<
		ReadTypeConverter<ReplaceRemoveWithUndefined<Base>>
	>,
	Compare = ReplaceInvalidDataType<ReadTypeConverter<RemoveRemove<Base>>>
> = {
	base: ReplaceInvalidDataType<Base>
	flatten_base: ObjectFlattenHybrid<ReplaceInvalidDataType<Base>>
	write: Write
	flatten_write: ObjectFlattenHybrid<Write>
	read: Read
	flatten_read: ObjectFlattenHybrid<Read>
	compare: Compare
	flatten_compare: ObjectFlattenHybrid<Compare>
}
