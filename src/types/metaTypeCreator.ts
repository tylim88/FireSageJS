import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidDataType } from './replaceInvalidData'
import { ReadTypeConverter } from './readTypeConverter'

export type MetaType = {
	write: unknown
	flatten_write: unknown
	read: unknown
	flatten_read: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	write: ReplaceInvalidDataType<Root>
	flatten_write: ObjectFlattenHybrid<ReplaceInvalidDataType<Root>>
	read: ReplaceInvalidDataType<ReadTypeConverter<Root>>
	flatten_read: ObjectFlattenHybrid<
		ReplaceInvalidDataType<ReadTypeConverter<Root>>
	>
}
