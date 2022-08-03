import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidDataType } from './replaceInvalidData'
import { ReadTypeConverter } from './readTypeConverter'

export type MetaType = {
	root: unknown
	flattenRoot: unknown
	read: unknown
	flattenRead: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	root: ReplaceInvalidDataType<Root>
	flattenRoot: ObjectFlattenHybrid<ReplaceInvalidDataType<Root>>
	read: ReplaceInvalidDataType<ReadTypeConverter<Root>>
	flattenRead: ObjectFlattenHybrid<
		ReplaceInvalidDataType<ReadTypeConverter<Root>>
	>
}
