import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '~/styles/globals.css'
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps
} from '@mantine/core'
import type { Metadata } from 'next'
import type { FC, PropsWithChildren } from 'react'
import { theme } from '~/styles/theme'

export const metadata: Metadata = {
	title: 'hjaerna',
	description: 'created by me'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='de' {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript defaultColorScheme='dark' />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme='dark'>
					{/* <Galaxy
						mouseRepulsion={false}
						mouseInteraction
						density={0.2}
						glowIntensity={0.1}
						saturation={10}
						hueShift={10}
						twinkleIntensity={0.001}
						rotationSpeed={0.0001}
						repulsionStrength={0.00001}
						autoCenterRepulsion={0}
						starSpeed={0.01}
						speed={0.0001}
					/> */}
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}

export default RootLayout
