import { Example } from './defineMetaType'
import { initializeApp } from 'firebase/app'
import { getDatabase, createRef } from 'firesagejs'

const app = initializeApp({
	projectId: '### PROJECT ID ###',
})

export const db = getDatabase()

export const exampleRef = createRef<Example>()
