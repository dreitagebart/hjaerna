'use client'

import {
	Badge,
	Group,
	Highlight,
	Paper,
	Text,
	UnstyledButton
} from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { useSearch } from '~/components/contexts'
import type { Braindump } from '~/types'

type Props = Braindump

export const BraindumpCard: FC<Props> = ({ slug, title, content, tags }) => {
	const { search } = useSearch()

	return (
		<Paper key={slug} p='xl' bg='crust.0'>
			<UnstyledButton component={Link} href={`/brain/${slug}`}>
				<Highlight fz='h3' fw='bold' highlight={search}>
					{title}
				</Highlight>
			</UnstyledButton>
			<Group mt='lg' gap='xs'>
				{tags
					? tags.map((tag) => (
							<Badge key={tag} variant='light'>
								# {tag}
							</Badge>
						))
					: null}
			</Group>
			{/* <Text>{content}</Text> */}
		</Paper>
	)
}
