'use client'

import { AppShell } from '@mantine/core'
import { type FC, type ReactNode, useState } from 'react'
import { SearchContextProvider } from '~/components/contexts'

import { BrainHeader } from './brain-header'
import { BrainMain } from './brain-main'

type Props = {
	children: ReactNode
}

export const BrainLayout: FC<Props> = ({ children }) => {
	const [search, setSearch] = useState('')
	const [thoughts, setThoughts] = useState([])

	return (
		<SearchContextProvider value={{ search, setSearch, thoughts, setThoughts }}>
			<AppShell withBorder={false} header={{ height: 80 }}>
				<BrainHeader />
				<BrainMain>{children}</BrainMain>
			</AppShell>
		</SearchContextProvider>
	)
}
