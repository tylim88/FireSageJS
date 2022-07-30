import { ObjectFlattenHybrid } from './objectFlatten'

export type MetaType = {
	base: unknown
	root: unknown
	rootName: string
	flattenRoot: unknown
	flattenBase: unknown
}

export type MetaTypeCreator<Base, RootName extends string, Root = Base> = {
	rootName: RootName
	root: Root
	base: Base
	flattenRoot: ObjectFlattenHybrid<Root>
	flattenBase: ObjectFlattenHybrid<Base>
}
