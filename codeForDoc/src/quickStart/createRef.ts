import { Example } from './defineMetaType'
import { initializeApp } from 'firebase/app'
import { getDatabase, createRef } from 'firesagejs'

const app = initializeApp({
	projectId: '### PROJECT ID ###',
})

const db = getDatabase() // or getDatabase(app)

export const exampleRef = createRef<Example>() // or createRef<Example>(db)
