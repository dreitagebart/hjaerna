import { APIError, betterAuth } from 'better-auth'
import { createAuthMiddleware } from 'better-auth/api'
import { config } from './config'

export const auth = betterAuth({
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
			strategy: 'jwe', // can be "jwt" or "compact"
			refreshCache: true // Enable stateless refresh
		}
	},
	account: {
		storeStateStrategy: 'cookie',
		storeAccountCookie: true // Store account data after OAuth flow in a cookie (useful for database-less flows)
	},
	socialProviders: {
		github: {
			clientId: config.github.clientId,
			clientSecret: config.github.clientSecret
		}
	}
})
