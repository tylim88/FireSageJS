import { ObjectFlattenHybrid } from './objectFlatten'

export type MetaType = {
	base: unknown
	root: unknown
	flattenRoot: unknown
	flattenBase: unknown
}

export type MetaTypeCreator<Base, Root = Base> = {
	root: Root
	base: Base
	flattenRoot: ObjectFlattenHybrid<Root>
	flattenBase: ObjectFlattenHybrid<Base>
}
