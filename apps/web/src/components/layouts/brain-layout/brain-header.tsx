'use client'

import {
	ActionIcon,
	AppShellHeader,
	Avatar,
	Container,
	Flex,
	Group,
	Loader,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	TextInput,
	UnstyledButton
} from '@mantine/core'
import { IconLogout2, IconSearch, IconX } from '@tabler/icons-react'
import { signOut } from 'better-auth/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC, useRef } from 'react'
import { useSearch } from '~/components/contexts'
import { HeaderLogo } from '~/components/logos'
import { useSession } from '../../../lib/auth-client'

type Props = {}

export const BrainHeader: FC<Props> = ({}) => {
	const router = useRouter()
	const { isPending, data } = useSession()
	const { search, setSearch } = useSearch()
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<AppShellHeader bg='crust'>
			<Container px='xl' h='100%'>
				<Flex h='100%' align='center' justify='space-between'>
					<Group>
						{isPending ? (
							<Loader size='md' />
						) : (
							<Menu position='bottom-start' withinPortal>
								<MenuTarget>
									<UnstyledButton>
										<Avatar size='md' radius='sm' src={data?.user.image} />
									</UnstyledButton>
								</MenuTarget>
								<MenuDropdown>
									<MenuItem
										leftSection={<IconLogout2 />}
										onClick={() =>
											signOut().then((res) => {
												if (res.success) {
													router.push('/')
												}
											})
										}
									>
										Logout
									</MenuItem>
								</MenuDropdown>
							</Menu>
						)}
						<TextInput
							ref={inputRef}
							styles={{ input: { backgroundColor: 'transparent' } }}
							variant='filled'
							leftSection={
								<ActionIcon
									variant='transparent'
									onClick={() => inputRef.current?.focus()}
								>
									<IconSearch />
								</ActionIcon>
							}
							rightSection={
								<ActionIcon
									variant='transparent'
									opacity={search.length > 0 ? 1 : 0}
									onClick={() => {
										setSearch('')
										inputRef.current?.focus()
									}}
								>
									<IconX />
								</ActionIcon>
							}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</Group>
					<UnstyledButton component={Link} href='/'>
						<HeaderLogo />
					</UnstyledButton>
				</Flex>
			</Container>
		</AppShellHeader>
	)
}
