import { exampleRef } from './createRef'

exampleRef() // point to 'root' node, type is --too long, skipped--
exampleRef('b') // point to 'b' node, type is --too long, skipped--
exampleRef('b/d/e') // point to 'b/d/e' node, write type is ServerTimestamp, compare and read type is number
exampleRef('g') // point to 'g' node, type is Record<string, { h: number; j: { k: boolean } }>
exampleRef('g/abc') // point to 'g/abc' node, type is { h: number; j: { k: boolean } }
exampleRef('i') // point to 'i' node, type is Record<`${number}`, string>
exampleRef('i/123') // point to 'i/123' node, type is string
