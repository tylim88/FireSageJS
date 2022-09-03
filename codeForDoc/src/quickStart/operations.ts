import { exampleRef } from './createRef'
import { set, get, update, serverTimestamp } from 'firesagejs'
//
;async () => {
	// it is impossible to use wrong path and wrong value
	await set(exampleRef('a'), 1)

	// 1st array is relative child paths
	// 2nd array is values, 'b/c' is boolean, 'b/d/e' is server timestamp
	// all paths and values are safely typed, it is impossible to use wrong path or match it with wrong value
	// the length of values will match the length of paths
	// finally it scans all paths, determining whether a child path is also a child of another child path because this will trigger runtime error.
	// all validations mentioned are done on type level
	await update(exampleRef(), ['b/c', 'b/d/e'], [true, serverTimestamp()])

	// everything here is type safe, it is impossible to use wrong child name!! See test file https://github.com/tylim88/FireSageJS/blob/main/src/operations/get.test.ts
	const snapshot = await get(exampleRef('f'))
	const val = snapshot.val() // value type is what defined in MetaType, in this case it is Record<string, 'a' | 'b' | 'c'> | null
	const exists = snapshot.exists() // boolean
	const size = snapshot.size // number
	const hasChild = snapshot.hasChild('k') // type of argument is what defined in MetaType, in this case it is `string` because 'f' is Record<string, 'a' | 'b' | 'c'>
	const hasChildren = snapshot.hasChildren() // boolean
	const json = snapshot.toJSON() // object, this one you have to type cast it by yourself
	snapshot.forEach((child, index) => {
		// child is also snapshot and can access forEach, val, key, size, exists, child, hasChild, hasChildren, toJSON
		// child is recursively typed, kaboom!!
	})
}
