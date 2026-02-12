'use client'

import { SimpleGrid } from '@mantine/core'
import { type FC, useEffect } from 'react'
import { BraindumpCard } from '~/components/cards'
import { useSearch } from '~/components/contexts'
import type { Braindump } from '~/types'

type Props = {
	data: Array<Braindump>
}

export const BrainView: FC<Props> = ({ data }) => {
	const { search, setThoughts } = useSearch()

	useEffect(() => {
		setThoughts(
			data.map(({ title, markdown }) => ({
				title,
				markdown
			}))
		)
	}, [data, setThoughts])

	return (
		<SimpleGrid cols={{ base: 1, sm: 2 }}>
			{data
				.filter(({ title, markdown }) => {
					const lower = search.toLowerCase()

					return (
						markdown.toLowerCase().includes(lower) ||
						title.toLowerCase().includes(lower)
					)
				})
				.map(({ ...dump }) => {
					return <BraindumpCard key={dump.slug} {...dump} />
				})}
		</SimpleGrid>
	)
}
