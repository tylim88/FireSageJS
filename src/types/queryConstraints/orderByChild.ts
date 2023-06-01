import { IsCharacterValid, ErrorNoInValidCharacter } from '../utils'
import { OrderByConstraint } from './query'

export type OrderByChild = <V extends string>(
	path: V extends never
		? V
		: IsCharacterValid<V, V, ErrorNoInValidCharacter, '/'>
) => OrderByConstraint<'orderByChild', V>
