import type { JSXElementConstructor, ReactElement } from 'react'

export type Frontmatter = {
	created: string
	type: string
	url: string
	tags: Array<string>
}

export type Braindump = {
	title: string
	slug: string
	created: string
	tags: Array<string>
	markdown: string
	type: string
	// biome-ignore lint/suspicious/noExplicitAny: <any needed>
	content: ReactElement<unknown, string | JSXElementConstructor<any>>
}
