import type { FC, ReactNode } from 'react'
import { BrainLayout } from '~/components/layouts'

type Props = {
	children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
	return <BrainLayout>{children}</BrainLayout>
}

export default Layout
