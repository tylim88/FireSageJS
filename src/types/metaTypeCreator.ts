import { ObjectFlattenHybrid } from './objectFlatten'
import { ReplaceInvalidData } from './replaceInvalidData'

export type MetaType = {
	base: unknown
	root: unknown
	flattenRoot: unknown
	flattenBase: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	root: ReplaceInvalidData<Root>
	base: ReplaceInvalidData<Base>
	flattenRoot: ObjectFlattenHybrid<ReplaceInvalidData<Root>>
	flattenBase: ObjectFlattenHybrid<ReplaceInvalidData<Base>>
}
