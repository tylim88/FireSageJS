import { getFiresage } from '..'
import { set, get, update } from '../operations'
import { initializeApp } from '../utilForTests'
import { MetaTypeCreator } from '../types'
import { increment } from './increment'

initializeApp()
describe('test increment', () => {
	const testIncrement = getFiresage<MetaTypeCreator<{ a: number }>>()()
	const node = testIncrement.ref('a')
	const root = testIncrement.ref()
	it('test with set', async () => {
		await set(node, -100)
		await set(node, increment(100)) // * unlike firestore, RTDB increment behave like update
		const dataSnapshot = await get(node)
		const data = dataSnapshot.val()
		expect(data).toBe(0)
	})
	it('test with update ', async () => {
		await update(root, { a: increment(-100) })
		const dataSnapshot = await get(node)
		const data = dataSnapshot.val()
		expect(data).toBe(-100)
	})
})
