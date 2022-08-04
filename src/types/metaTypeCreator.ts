import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidDataType } from './replaceInvalidData'
import { ReadTypeConverter } from './readTypeConverter'

export type MetaType = {
	base: unknown
	flatten_base: unknown
	write: unknown
	flatten_write: unknown
	read: unknown
	flatten_read: unknown
}

export type MetaTypeCreator<Base> = {
	base: ReplaceInvalidDataType<Base>
	flatten_base: ObjectFlattenHybrid<ReplaceInvalidDataType<Base>>
	write: ReplaceInvalidDataType<Base>
	flatten_write: ObjectFlattenHybrid<ReplaceInvalidDataType<Base>>
	read: ReplaceInvalidDataType<ReadTypeConverter<Base>>
	flatten_read: ObjectFlattenHybrid<
		ReplaceInvalidDataType<ReadTypeConverter<Base>>
	>
}
