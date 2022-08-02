export type RemoveLastSlash<T extends string> = T extends `${infer R}/` ? R : T

// https://javascript.plainenglish.io/using-firestore-with-more-typescript-8058b6a88674
type DeepKeyHybridInner<
	T,
	K extends keyof T,
	Mode extends 'read' | 'write',
	ACC extends string = `${K & string}/`,
	FullParentPath extends string = never
> = K extends string
	? T[RemoveLastSlash<K> & keyof T] extends Record<string, unknown>
		? DeepKeyHybridInner<
				T[RemoveLastSlash<K> & keyof T],
				keyof T[RemoveLastSlash<K> & keyof T],
				Mode,
				| `${RemoveLastSlash<
						FullParentPath[] extends never[] ? K : FullParentPath
				  >}/${keyof T[RemoveLastSlash<K> & keyof T] & string}/`
				| ACC
				| (Mode extends 'write'
						? `${RemoveLastSlash<
								FullParentPath[] extends never[] ? K : FullParentPath
						  >}/`
						: never),
				`${RemoveLastSlash<
					FullParentPath[] extends never[] ? K : FullParentPath
				>}/${keyof T[RemoveLastSlash<K> & keyof T] & string}/`
		  >
		: ACC
	: never // impossible route
type u = { a: never }
type o = DeepKeyHybrid<
	{
		a: 1
		b: {
			c: 2
			d: { e: 5; f: Record<string, boolean> }
		}
	},
	'write'
>

export type DeepKeyHybrid<
	T,
	Mode extends 'read' | 'write'
> = DeepKeyHybridInner<T, keyof T, Mode>

type DeepValueHybrid<
	T,
	P extends DeepKeyHybrid<T, Mode>,
	Mode extends 'read' | 'write'
> = P extends `${infer K}/${infer Rest}`
	? K extends keyof T
		? Rest extends DeepKeyHybrid<T[K], Mode>
			? DeepValueHybrid<T[K], Rest, Mode>
			: never // impossible route
		: never // impossible route
	: P extends keyof T
	? T[P]
	: never // impossible route

export type ObjectFlattenHybrid<Data> = Data extends Record<string, unknown>
	? // @ts-expect-error
	  {
			[K in DeepKeyHybrid<Data, 'write'>]-?: ObjectFlattenHybrid<
				DeepValueHybrid<Data, K, 'write'>
			>
	  }
	: Data
