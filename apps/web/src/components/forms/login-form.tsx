'use client'

import { Button } from '@mantine/core'
import { IconBrandGithubFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { signIn } from '~/lib/auth-client'

export const LoginForm = () => {
	const router = useRouter()

	return (
		<Button
			leftSection={<IconBrandGithubFilled />}
			onClick={async () => {
				const { error } = await signIn.social({ provider: 'github' })

				if (error) {
					return alert('Could not login')
				}

				return router.push('/brain')
			}}
		>
			login with github
		</Button>
	)
}
