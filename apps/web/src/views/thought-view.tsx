import { Badge, Group, Text } from '@mantine/core'
import type { FC } from 'react'
import type { Braindump } from '~/types'

type Props = {
	data: Braindump
}

export const ThoughtView: FC<Props> = ({ data }) => {
	return (
		<>
			<Text fz='h3'>{data.title}</Text>
			<Text fz='sm'>{data.created}</Text>
			{data.content}
			<Group my='xl'>
				{data.tags
					? data.tags.map((tag) => {
							return (
								<Badge key={tag} variant='light'>
									# {tag}
								</Badge>
							)
						})
					: null}
			</Group>
		</>
	)
}
