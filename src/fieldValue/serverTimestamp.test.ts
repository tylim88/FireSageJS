import { getFiresage } from '..'
import { set, get } from '../operations'
import { initializeApp } from '../utilForTests'
import { MetaTypeCreator, ServerTimestamp } from '../types'
import { serverTimestamp } from './serverTimestamp'

initializeApp()
describe('test serverTimestamp', () => {
	const firesage = getFiresage<MetaTypeCreator<{ a: ServerTimestamp }>>()()
	const node = firesage.ref('a')
	it('test with set', async () => {
		await set(node, serverTimestamp())
		const dataSnapshot = await get(node)
		const data = dataSnapshot.val()
		expect(typeof data).toBe('number')
	})
})
