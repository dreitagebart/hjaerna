'use client'

import { Button, Group, Tooltip } from '@mantine/core'
import { useClipboard, useDisclosure, useWindowScroll } from '@mantine/hooks'
import { nprogress } from '@mantine/nprogress'
import { IconClipboard } from '@tabler/icons-react'
import { useEffect } from 'react'

export const ScrollProgress = () => {
	const [scroll] = useWindowScroll()
	const [copied, { close, open }] = useDisclosure(false)
	const clipboard = useClipboard({ timeout: 500 })

	useEffect(() => {
		const height = document.documentElement.scrollHeight
		const clientHeight = document.documentElement.clientHeight
		const scrollable = height - clientHeight
		const scrolled = scrollable > 0 ? (scroll.y / scrollable) * 100 : 0

		nprogress.set(scrolled)
	}, [scroll.y])

	return (
		<Group justify='flex-end'>
			<Tooltip
				position='left'
				label='URL has been copied...'
				opened={copied}
				withArrow
			>
				<Button
					onBlur={close}
					variant='light'
					leftSection={<IconClipboard />}
					onClick={() => {
						clipboard.copy(window.location.href)
						open()
					}}
				>
					copy URL
				</Button>
			</Tooltip>
		</Group>
	)
}
