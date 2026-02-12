import { Center, Container } from '@mantine/core'
import { LightPillar } from '~/components/effects'
import { LoginForm } from '~/components/forms'

export const LoginView = () => {
	return (
		<Container px='xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
			<LightPillar />
			<Center h='60%'>
				<LoginForm />
			</Center>
		</Container>
	)
}
