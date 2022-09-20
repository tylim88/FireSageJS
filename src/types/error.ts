import { TransformUndefinedToRoot } from './utils'

export type ErrorNotPushAble<T extends string | undefined> =
	`Error: The ${TransformUndefinedToRoot<T>} node is not push-able, only PushAble<T> or PushAbleOnly<T> type can be pushed. Please check the MetaType and assign Push<T> or PushAbleOnly<T> type to ${TransformUndefinedToRoot<T>} node`
export type ErrorNotRemoveAble<T extends string | undefined> =
	`Error: The ${TransformUndefinedToRoot<T>} node is not removable, only Removable node can be removed. Please check the MetaType and union ${TransformUndefinedToRoot<T>} node with Removable`
