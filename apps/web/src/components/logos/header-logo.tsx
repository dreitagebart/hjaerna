import { Group, Text, ThemeIcon } from '@mantine/core'
import { IconBrain } from '@tabler/icons-react'

export const HeaderLogo = () => {
	return (
		<Group style={{ userSelect: 'none' }} align='center' gap='xs'>
			<ThemeIcon variant='transparent' c='mauve'>
				<IconBrain size={42} stroke={1.5} />
			</ThemeIcon>
			<Text
				fz={42}
				lh={1}
				variant='gradient'
				gradient={{ deg: 100, from: 'mauve.0', to: 'green.0' }}
			>
				hjaerna
			</Text>
		</Group>
	)
}
