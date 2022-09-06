import { MetaType } from './metaType'
import { DataSnapshot } from './snapshots'
import { TransactionOptions } from './alias'
import {
	FindNestedReadTypeFromFullPath,
	FindNestedWriteTypeFromFullPath,
	ValidateRecordString,
} from './utils'
import { DatabaseReference } from './refs'

export type RunTransaction = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V
>(
	ref: DatabaseReference<T, U>,
	transactionUpdate: (
		currentData: FindNestedReadTypeFromFullPath<T, U, T['read']> | null
	) => V extends never
		? V
		:
				| ValidateRecordString<
						V,
						FindNestedWriteTypeFromFullPath<T, U, T['write']>
				  >
				| null
				| undefined,
	options?: TransactionOptions
) => Promise<TransactionResult<T, U>>

/**
 * A type for the resolve value of {@link RunTransaction}.
 */
export declare class TransactionResult<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> {
	/** Whether the transaction was successfully committed. */
	readonly committed: boolean
	/** The resulting data snapshot. */
	readonly snapshot: DataSnapshot<T, U>
	private constructor()
	/** Returns a JSON-serializable representation of this object. */
	toJSON(): object
}
