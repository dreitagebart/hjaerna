import type { FC, ReactNode } from 'react'
import { ScrollProgress } from '~/components/effects'

type Props = {
	children: ReactNode
}

export const ThoughtLayout: FC<Props> = ({ children }) => {
	return (
		<>
			<ScrollProgress />
			{children}
		</>
	)
}
