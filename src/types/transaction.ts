import { MetaType } from './metaType'
import { DataSnapshot } from './snapshots'
import { TransactionOptions } from './alias'
import {
	FindNestedReadTypeFromFullPath,
	FindNestedWriteTypeFromFullPath,
	ValidateRecordString,
} from './utils'
import { DatabaseReference } from './refs'

/**
 *
(alias) runTransaction_(ref: Reference, transactionUpdate: (currentData: any) => unknown, options?: TransactionOptions | undefined): Promise<TransactionResult> (+1 overload)
import runTransaction_
Atomically modifies the data at this location.

Atomically modify the data at this location. Unlike a normal set(), which just overwrites the data regardless of its previous value, runTransaction() is used to modify the existing value to a new value, ensuring there are no conflicts with other clients writing to the same location at the same time.

To accomplish this, you pass runTransaction() an update function which is used to transform the current value into a new value. If another client writes to the location before your new value is successfully written, your update function will be called again with the new current value, and the write will be retried. This will happen repeatedly until your write succeeds without conflict or you abort the transaction by not returning a value from your update function.

Note: Modifying data with set() will cancel any pending transactions at that location, so extreme care should be taken if mixing set() and runTransaction() to update the same data.

Note: When using transactions with Security and Firebase Rules in place, be aware that a client needs .read access in addition to .write access in order to perform a transaction. This is because the client-side nature of transactions requires the client to read the data in order to transactionally update it.

@param ref — The location to atomically modify.

@param transactionUpdate
A developer-supplied function which will be passed the current data stored at this location (as a JavaScript object). The function should return the new value it would like written (as a JavaScript object). If undefined is returned (i.e. you return with no arguments) the transaction will be aborted and the data at this location will not be modified.

@param options — An options object to configure transactions.

@returns
A Promise that can optionally be used instead of the onComplete callback to handle success and failure.
 */
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
