import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidDataType } from './replaceInvalidData'
import { ReadTypeConverter } from './readTypeConverter'

export type MetaType = {
	write: unknown
	flattenWrite: unknown
	read: unknown
	flattenRead: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	write: ReplaceInvalidDataType<Root>
	flattenWrite: ObjectFlattenHybrid<ReplaceInvalidDataType<Root>>
	read: ReplaceInvalidDataType<ReadTypeConverter<Root>>
	flattenRead: ObjectFlattenHybrid<
		ReplaceInvalidDataType<ReadTypeConverter<Root>>
	>
}
