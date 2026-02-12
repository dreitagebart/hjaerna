import { AppShellMain, Container, Space } from '@mantine/core'
import type { FC, ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export const BrainMain: FC<Props> = ({ children }) => {
	return (
		<AppShellMain>
			<Space h={40} />
			<Container px='xl'>{children}</Container>
		</AppShellMain>
	)
}
