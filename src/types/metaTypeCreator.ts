import { ObjectFlattenHybrid } from './objectFlatten'

export type MetaType = {
	base: unknown
	root: unknown
	rootPath: string
	flattenRoot: unknown
	flattenBase: unknown
}

export type MetaTypeCreator<Base, rootPath extends string, Root = Base> = {
	rootPath: rootPath
	root: Root
	base: Base
	flattenRoot: ObjectFlattenHybrid<Root>
	flattenBase: ObjectFlattenHybrid<Base>
}
