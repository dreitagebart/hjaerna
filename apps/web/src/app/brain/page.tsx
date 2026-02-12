import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, parse } from 'node:path'
import slugify from '@sindresorhus/slugify'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { Braindump, Frontmatter } from '~/types'
import { BrainView } from '~/views/brain-view'

export const revalidate = 60

const basePath = join(process.cwd(), 'public', 'data')

const Page = async () => {
	const brainDump: Array<Braindump> = []
	const files = readdirSync(basePath)

	const mdxOnly = files.filter((file) => extname(file) === '.md')

	for await (const mdx of mdxOnly) {
		const { name } = parse(mdx)

		const source = readFileSync(join(process.cwd(), 'public', 'data', mdx), {
			encoding: 'utf8'
		})

		const { content, frontmatter } = await compileMDX<Frontmatter>({
			source,
			options: {
				parseFrontmatter: true
			}
		})

		brainDump.push({
			title: name,
			slug: slugify(name),
			created: frontmatter.created,
			tags: frontmatter.tags,
			type: frontmatter.type,
			content,
			markdown: source
		})
	}

	return <BrainView data={brainDump} />
}

export default Page
