import { MetaType } from './metaTypeCreator'
import { DataSnapshot } from './snapshots'

export declare class TransactionResult<
	T extends MetaType,
	U extends (keyof T['flatten_base'] & string) | undefined
> {
	/** Whether the transaction was successfully committed. */
	readonly committed: boolean
	/** The resulting data snapshot. */
	readonly snapshot: DataSnapshot<T, U>
	private constructor()
	/** Returns a JSON-serializable representation of this object. */
	toJSON(): object
}
