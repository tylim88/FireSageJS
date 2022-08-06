import { Remove, Push } from './fieldValue'
import { GetAllRemovePath } from './remove'
import { MetaTypeCreator } from './metaTypeCreator'

type Base = {
	a: Push<{
		b: 1
		c: Remove | { k: boolean }
		d: Push<{ j: Remove | 1 }> | Remove
	}>
}
describe('test remove type utilities', () => {
	it('test Get All Remove Path', () => {
		type A = GetAllRemovePath<Base>
	})
})
