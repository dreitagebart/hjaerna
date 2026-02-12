'use client'

import {
	Button,
	Center,
	Flex,
	Group,
	Stack,
	Text,
	useMantineTheme,
	useMatches
} from '@mantine/core'
import { IconBrain } from '@tabler/icons-react'
import Link from 'next/link'
import { LightPillar } from '~/components/effects'
import { Slogan } from '~/components/heroes'

import classes from './start-view.module.css'

export const StartView = () => {
	const theme = useMantineTheme()
	const fontSize = useMatches({
		base: 60,
		sm: 120
	})

	return (
		<LightPillar
			topColor={theme.colors.mauve[0]}
			bottomColor={theme.colors.green[0]}
			intensity={1}
			rotationSpeed={0.3}
			glowAmount={0.002}
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
					<Stack align='center' gap={0} className={classes.container}>
						<IconBrain
							size={fontSize + 100}
							style={{
								boxShadow: '0px 0px 40px rgba(255, 255, 255, 1)'
							}}
						/>
						<Text
							style={{
								textShadow: '0px 0px 20px rgba(255, 255, 255, 1)'
							}}
							fz={fontSize}
							variant='gradient'
							gradient={{
								deg: 90,
								from: theme.colors.mauve[0],
								to: theme.colors.green[0]
							}}
						>
							hjaerna
						</Text>
						<Slogan />
						<Group mt='xl'>
							<Button size='lg' component={Link} href='/brain'>
								check my brain
							</Button>
						</Group>
					</Stack>
				</Center>
			</Flex>
		</LightPillar>
	)
}
