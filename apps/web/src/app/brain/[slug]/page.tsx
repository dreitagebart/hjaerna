import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, parse } from 'node:path'
import slugify from '@sindresorhus/slugify'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { FC } from 'react'
import type { Frontmatter } from '~/types'
import { ThoughtView } from '~/views/thought-view'

type Props = {
	searchParams: Promise<{ title: string }>
	params: Promise<{ slug: string }>
}

const basePath = join(process.cwd(), 'public', 'data')

const getSlugToFileMapping = () => {
	const mdxFiles = readdirSync(basePath).filter((file) => {
		const fullPath = join(basePath, file)

		return extname(file) === '.md' && statSync(fullPath).isFile()
	})

	const mapping: Record<string, string> = {}
	mdxFiles.forEach((file) => {
		const { name } = parse(file)

		mapping[slugify(name)] = file
	})

	return mapping
}

export const revalidate = 60

export const generateStaticParams = () => {
	const slugToFile = getSlugToFileMapping()

	return Object.keys(slugToFile).map((slug) => ({ slug }))
}

const Page: FC<Props> = async ({ params }) => {
	const { slug } = await params
	const slugToFile = getSlugToFileMapping()
	const fileName = slugToFile[slug]

	if (!fileName) {
		return notFound()
	}

	const filePath = join(basePath, fileName)
	const source = readFileSync(filePath, 'utf-8')

	const { content, frontmatter } = await compileMDX<Frontmatter>({
		source,
		options: {
			parseFrontmatter: true
		}
	})

	return (
		<ThoughtView
			data={{
				content,
				created: frontmatter.created,
				slug,
				tags: frontmatter.tags,
				title: fileName,
				type: frontmatter.type
			}}
		></ThoughtView>
	)
}

export default Page
