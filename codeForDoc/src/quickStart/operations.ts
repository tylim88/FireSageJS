import { exampleRef, db } from './createRef'
import {
	set,
	get,
	update,
	serverTimestamp,
	remove,
	push,
	increment,
} from 'firesagejs'
//
;async () => {
	// it is impossible to use wrong path and wrong value
	// you can skip db argument (the rest of examples will go without db)
	// the type of node 'a' is numeric literal 1 | 90 | 3700, it is not possible to use `increment` on it
	await set(exampleRef(db, 'a'), 1)

	// 1st array is relative child paths
	// 2nd array is values, 'b/c' is boolean, 'b/d/e' is server timestamp
	// all paths and values are safely typed, it is impossible to use wrong path or match it with wrong value
	// the length of values will match the length of paths
	// finally it scans all paths to find out whether a child path is also a child of another path (if exist it will throw at runtime).
	await update(exampleRef(), ['b/c', 'b/d/e'], [true, serverTimestamp()])

	// It is impossible to use wrong child name
	const snapshot = await get(exampleRef('f'))
	const val = snapshot.val() // value type is what defined in MetaType, in this case it is Record<string, 'a' | 'b' | 'c'> | null
	const exists = snapshot.exists() // boolean
	const size = snapshot.size // number
	const hasChild = snapshot.hasChild('k') // type of argument is what defined in MetaType, in this case it is `string` because 'f' is Record<string, 'a' | 'b' | 'c'>
	const hasChildren = snapshot.hasChildren() // boolean
	const json = snapshot.toJSON() // object, this one you have to type cast it
	snapshot.forEach((child, index) => {
		// the official SDK does not provide index, but you get one here, for free
		// like official SDK, child is also snapshot and can access forEach, val, key, size, exists, child, hasChild, hasChildren, toJSON
		// child is recursively typed, hooray!!
	})

	// only node with Removable type can be removed and b/c is boolean | Removable
	await remove(exampleRef('b/c'))

	// only PushAbleOnly node can be pushed
	// you cannot set or update PushAbleOnly node
	// you can update or set the child of PushAbleOnly node, as long as the child itself is not PushAbleOnly
	await push(exampleRef('g'), { h: increment(1) })
}
