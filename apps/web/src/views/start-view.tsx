'use client'

import {
	Button,
	Center,
	darken,
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
					<Stack align='center' gap={0}>
						<IconBrain className={classes.icon} />
						<Text
							className={classes.appName}
							fz={fontSize}
							// variant='gradient'
							// gradient={{
							// 	deg: 90,
							// 	from: theme.colors.green[0],
							// 	to: theme.colors.lavender[0]
							// }}
						>
							hjaerna
						</Text>
						<Slogan />
						<Group mt='xl'>
							<Button variant='white' size='lg' component={Link} href='/brain'>
								check my brain
							</Button>
						</Group>
					</Stack>
				</Center>
			</Flex>
		</LightPillar>
	)
}
