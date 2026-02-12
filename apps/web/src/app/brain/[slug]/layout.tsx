import { NavigationProgress } from '@mantine/nprogress'
import type { FC, ReactNode } from 'react'
import { ThoughtLayout } from '~/components/layouts'

type Props = {
	children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<ThoughtLayout>
			<NavigationProgress size={1} defaultValue={0} />
			{children}
		</ThoughtLayout>
	)
}

export default Layout
