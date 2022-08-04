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

export type MetaTypeCreator<Base, Root = Base> = {
	base: ReplaceInvalidDataType<Root>
	flatten_base: ObjectFlattenHybrid<ReplaceInvalidDataType<Root>>
	write: ReplaceInvalidDataType<Root>
	flatten_write: ObjectFlattenHybrid<ReplaceInvalidDataType<Root>>
	read: ReplaceInvalidDataType<ReadTypeConverter<Root>>
	flatten_read: ObjectFlattenHybrid<
		ReplaceInvalidDataType<ReadTypeConverter<Root>>
	>
}
