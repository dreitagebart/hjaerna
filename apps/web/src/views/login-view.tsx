'use client'

import { Center, Flex, useMantineTheme } from '@mantine/core'
import { LightPillar } from '~/components/effects'
import { LoginForm } from '~/components/forms'

export const LoginView = () => {
	const theme = useMantineTheme()

	return (
		<LightPillar
			topColor={theme.colors.lavender[0]}
			bottomColor={theme.colors.green[0]}
			intensity={1}
			rotationSpeed={0.3}
			glowAmount={0.0005}
			pillarWidth={2}
			pillarHeight={0.4}
			noiseIntensity={0.5}
			pillarRotation={25}
			interactive={false}
			mixBlendMode='screen'
			quality='high'
		>
			<Flex
				pos='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				align='center'
				justify='center'
				style={{
					zIndex: 10
				}}
			>
				<Center c='white'>
					<LoginForm />
				</Center>
			</Flex>
		</LightPillar>
	)
}
