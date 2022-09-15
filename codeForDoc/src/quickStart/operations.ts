import { exampleRef } from './createRef'
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
	await set(exampleRef('a'), 1)

	await update(exampleRef(), ['b/c', 'b/d/e'], [true, serverTimestamp()])

	const snapshot = await get(exampleRef('f'))
	const val = snapshot.val()
	const exists = snapshot.exists()
	const size = snapshot.size
	const hasChild = snapshot.hasChild('k')
	const hasChildren = snapshot.hasChildren()
	const json = snapshot.toJSON()
	snapshot.forEach((child, index) => {})

	await remove(exampleRef('b/c'))

	await push(exampleRef('g'), { h: increment(1), j: { k: true } })
}
