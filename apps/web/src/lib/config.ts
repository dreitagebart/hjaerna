import dotenv from 'dotenv'

dotenv.config({
	path: '../../.env'
})

export const config = {
	betterAuth: {
		secret: String(process.env.BETTER_AUTH_SECRET),
		url: String(process.env.BETTER_AUTH_URL)
	},
	github: {
		clientId: String(process.env.GITHUB_CLIENT_ID),
		clientSecret: String(process.env.GITHUB_CLIENT_SECRET)
	}
}
