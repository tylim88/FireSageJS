import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidData } from './replaceInvalidData'

export type MetaType = {
	root: unknown
	flattenRoot: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	root: ReplaceInvalidData<Root>
	flattenRoot: ObjectFlattenHybrid<ReplaceInvalidData<Root>>
}
